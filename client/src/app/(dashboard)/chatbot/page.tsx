"use client";

import InputArea from "@/components/InputArea";
import { useState, useEffect, useRef } from "react";
import ayna from "@/assets/ayna.svg";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import ChatMessage from "@/components/ChatMessage";
import { Chat } from "@/interfaces/chat";
import { io, Socket } from "socket.io-client";
import axiosInstance from "@/lib/axiosInstance";

const Page = () => {
  const [text, setText] = useState("");
  const [chat, setChat] = useState<Chat[]>([]);
  const socketRef = useRef<Socket | null>(null);

  // Initialize WebSocket connection
  useEffect(() => {
    const token = localStorage.getItem("jwt");

    if (!token) {
      console.error("JWT token not found in localStorage.");
      return;
    }

    const socket = io("http://localhost:1337", {
      extraHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });

    socketRef.current = socket;

    // Handle incoming messages from the server
    socket.on("message", (data) => {
      console.log("Received message from server:", data);

      const messageData = data.data.data; // Correctly access the inner 'data'

      setChat((prev) => [
        ...prev,
        {
          id: messageData.id,
          message: messageData.content,
          role: messageData.role,
          timestamp: new Date(messageData.createdAt), // Use the correct 'createdAt'
        },
      ]);
    });

    // Handle errors
    socket.on("error", (err) => {
      console.error("WebSocket error:", err);
    });

    // Handle disconnection
    socket.on("disconnect", () => {
      console.log("Disconnected from WebSocket server");
    });

    return () => {
      // Clean up on component unmount
      socket.disconnect();
    };
  }, []);

  const handleSend = async () => {
    const token = localStorage.getItem("jwt");

    if (!token) {
      alert("JWT token not found in localStorage.");
      return;
    }
    try {
      // Fetch or create a session if not already created
      const session = (await axiosInstance.post("/api/sessions")).data.data;

      // Send message to the WebSocket server
      socketRef.current?.emit("message", {
        sessionId: session.id,
        content: text,
      });
      window.history.pushState({}, "", `/chatbot/${session.id}`);
      setText("");
    } catch (error) {
      console.error("Error while sending message:", error);
    }
  };

  return (
    <div className="border bg-white rounded-lg flex-1 flex flex-col shadow-md p-4">
      <AnimatePresence>
        {chat.length == 0 ? (
          <motion.div
            initial={{ opacity: 0.2, filter: "blur(20px)" }}
            animate={{ opacity: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0.2, filter: "blur(20px)" }}
            transition={{ duration: 0.3 }}
            className="flex flex-col text-center items-center justify-center flex-1"
          >
            <div className="flex flex-col justify-center items-center gap-4">
              {/* Responsive Image */}
              <Image
                src={ayna}
                alt="ayna"
                width={300}
                height={300}
                className="h-30 w-auto sm:h-40 md:h-50"
              />
              {/* Responsive Text */}
              <div className="text-2xl sm:text-3xl md:text-5xl font-light">
                Start chatting with our&nbsp;
                <span className="font-semibold text-primary">AI Chatbot</span>
                &nbsp;!
              </div>
              <div className="text-sm sm:text-base md:text-lg font-light">
                Ask me anything!
              </div>
            </div>
          </motion.div>
        ) : (
          <div className="custom-scrollbar flex flex-1 flex-col overflow-y-auto overflow-x-hidden gap-1">
            {chat.map((item) => (
              <ChatMessage key={item.id} {...item} />
            ))}
          </div>
        )}
      </AnimatePresence>
      <InputArea text={text} setText={setText} onSend={handleSend} />
    </div>
  );
};

export default Page;
