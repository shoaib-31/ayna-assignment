"use client";
import React, { useState } from "react";
import InputArea from "./InputArea";
import { Chat } from "@/interfaces/chat";
import ChatMessage from "./ChatMessage";

const ChatWindow = ({
  chatId,
  initialChat,
}: {
  chatId: string;
  initialChat: Chat[];
}) => {
  const [chat, setChat] = useState<Chat[]>(initialChat);
  const [text, setText] = useState("");
  console.log(chatId);
  const handleSend = async () => {
    setChat((prev) => [
      ...prev,
      {
        id: (Math.random() * 1000).toString(),
        message: text,
        role: "user",
        timestamp: new Date(),
      },
    ]);
    setText("");
    await new Promise((resolve) =>
      setTimeout(() => resolve({ message: "Data Loaded!" }), 2000)
    );
    const { data }: { data: Chat } = {
      data: {
        id: (Math.random() * 1000).toString(),
        message: "chatbot",
        role: "bot",
        timestamp: new Date(),
      },
    };
    setChat((prev) => [...prev, data]);
  };
  return (
    <>
      <div className=" flex flex-1 flex-col gap-1">
        {chat.map((item) => (
          <ChatMessage key={item.id} {...item} />
        ))}
      </div>
      <InputArea text={text} setText={setText} onSend={handleSend} />
    </>
  );
};

export default ChatWindow;
