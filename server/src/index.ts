import type { Core } from "@strapi/strapi";
import { Server } from "socket.io";
import jwt from "jsonwebtoken";
import axios from "axios";

export default {
  register() {},

  bootstrap({ strapi }: { strapi: Core.Strapi }) {
    const connectedUsers = new Map();

    const io = new Server(strapi.server.httpServer, {
      cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST", "PUT", "DELETE"],
        allowedHeaders: ["Authorization"],
        credentials: true,
      },
    });

    io.use((socket, next) => {
      const token = socket.handshake.headers.authorization;

      if (!token) {
        console.log("Connection rejected: No token provided");
        return next(new Error("Unauthorized: No token provided"));
      }

      try {
        const decoded = jwt.verify(token.split(" ")[1], process.env.JWT_SECRET);
        //@ts-ignore
        socket.user = decoded;
        return next();
      } catch (err) {
        console.log("Connection rejected: Invalid token");
        return next(new Error("Unauthorized: Invalid token"));
      }
    });

    io.on("connection", (socket) => {
      // @ts-ignore
      const userId = socket.user.id;

      connectedUsers.set(userId, socket.id);

      socket.on("message", async (data) => {
        const { sessionId, content } = data;

        if (!sessionId || !content) {
          console.log("Invalid message data");
          socket.emit("error", { message: "Invalid message data" });
          return;
        }

        try {
          const response = await axios.post(
            "http://localhost:1337/api/messages",
            {
              data: {
                session: sessionId,
                content,
                role: "user",
              },
            },
            {
              headers: {
                Authorization: socket.handshake.headers.authorization,
              },
            }
          );

          console.log("User message saved:", response.data);
          socket.emit("message", {
            userId,
            data: response.data,
          });
          const response1 = await axios.post(
            "http://localhost:1337/api/messages",
            {
              data: {
                session: sessionId,
                content,
                role: "bot",
              },
            },
            {
              headers: {
                Authorization: socket.handshake.headers.authorization,
              },
            }
          );

          console.log("Bot message saved:", response1.data);

          socket.emit("message", {
            userId,
            data: response1.data,
          });
        } catch (err) {
          console.error(
            "Failed to save message:",
            err.response?.data || err.message
          );
          socket.emit("error", { message: "Failed to save message" });
        }
      });

      socket.on("disconnect", () => {
        console.log(`User disconnected: ${userId}`);
        connectedUsers.delete(userId);
      });
    });

    console.log("Socket.IO server initialized");
  },
};
