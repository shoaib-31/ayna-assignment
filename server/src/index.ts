import type { Core } from "@strapi/strapi";
import { Server } from "socket.io";
import jwt from "jsonwebtoken";

export default {
  register() {},

  bootstrap({ strapi }: { strapi: Core.Strapi }) {
    // Map to maintain connected users
    const connectedUsers = new Map();

    const io = new Server(strapi.server.httpServer, {
      cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST", "PUT", "DELETE"],
        allowedHeaders: ["Authorization"],
        credentials: true,
      },
    });

    // Middleware for authentication
    io.use((socket, next) => {
      const token = socket.handshake.headers.authorization;

      if (!token) {
        console.log("Connection rejected: No token provided");
        return next(new Error("Unauthorized: No token provided"));
      }

      try {
        const decoded = jwt.verify(token.split(" ")[1], process.env.JWT_SECRET); // Replace with your secret
        //@ts-ignore
        socket.user = decoded; // Attach user data to the socket
        return next();
      } catch (err) {
        console.log("Connection rejected: Invalid token");
        return next(new Error("Unauthorized: Invalid token"));
      }
    });

    // Handle connections
    io.on("connection", (socket) => {
      console.log("New connection");
      // @ts-ignore
      const userId = socket.user.id;
      console.log(`User connected: ${userId}`);

      // Add the user to the connectedUsers map
      connectedUsers.set(userId, socket.id);

      // Handle message event
      socket.on("message", (message) => {
        console.log(`Message received from user ${userId}: ${message}`);

        // Echo the message back to the sender
        socket.emit("message", {
          userId,
          text: message,
        });
      });

      // Handle disconnection
      socket.on("disconnect", () => {
        console.log(`User disconnected: ${userId}`);
        connectedUsers.delete(userId); // Remove user from the map
      });
    });

    console.log("Socket.IO server initialized");
  },
};
