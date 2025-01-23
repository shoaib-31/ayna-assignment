"use client";
import React, { useEffect, useState, useRef } from "react";
import InputArea from "./InputArea";
import { Chat } from "@/interfaces/chat";
import ChatMessage from "./ChatMessage";
import axiosInstance from "@/lib/axiosInstance";
import { io, Socket } from "socket.io-client";

interface Message {
  id: string;
  content: string;
  role: string;
  createdAt: string;
  updatedAt: string;
}

const ChatWindow = ({ sessionId }: { sessionId: string }) => {
  const [chat, setChat] = useState<Chat[]>([]);
  const bottomRef = useRef<HTMLDivElement | null>(null); // Ref for the bottom of the chat
  const socketRef = useRef<Socket | null>(null);

  // Fetch initial chat messages
  const getInitialChat = async () => {
    try {
      const { data } = await axiosInstance.get(
        `/api/messages?filters[session][id][$eq]=${sessionId}&sort[createdAt]=asc`
      );
      const chat: Chat[] = data.data.map((message: Message) => ({
        id: message.id,
        message: message.content,
        role: message.role,
        timestamp: new Date(message.createdAt),
      }));
      setChat(chat);
    } catch (error) {
      console.error("Failed to fetch initial chat:", error);
    }
  };

  // Scroll to the bottom whenever the chat updates
  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [chat]);

  useEffect(() => {
    getInitialChat();
  }, [sessionId]);
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
  const [text, setText] = useState("");

  // Handle sending a message
  const handleSend = async () => {
    const token = localStorage.getItem("jwt");

    if (!token) {
      alert("JWT token not found in localStorage.");
      return;
    }
    try {
      // Send message to the WebSocket server
      socketRef.current?.emit("message", {
        sessionId: sessionId,
        content: text,
      });
      setText("");
    } catch (error) {
      console.error("Error while sending message:", error);
    }
  };

  return (
    <>
      <div className="custom-scrollbar flex flex-1 flex-col overflow-y-auto overflow-x-hidden gap-1">
        {chat.map((item) => (
          <ChatMessage key={item.id} {...item} />
        ))}
        {/* Invisible div to scroll to the bottom */}
        <div ref={bottomRef} />
      </div>
      <InputArea text={text} setText={setText} onSend={handleSend} />
    </>
  );
};

export default ChatWindow;
