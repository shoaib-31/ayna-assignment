import ChatWindow from "@/components/ChatWindow";
import { Chat } from "@/interfaces/chat";
import React from "react";

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const chatId = (await params).id;
  const chat: Chat[] = [
    {
      id: "1",
      message: "What is your name?",
      role: "user",
      timestamp: new Date(),
    },
    {
      id: "2",
      message: "My name is shoaib",
      role: "bot",
      timestamp: new Date(),
    },
  ];
  await new Promise((resolve) =>
    setTimeout(() => resolve({ message: "Data Loaded!" }), 2000)
  );
  return (
    <div className="border bg-white rounded-lg flex-1 flex flex-col shadow-md p-4">
      <ChatWindow chatId={chatId} initialChat={chat} />
    </div>
  );
};

export default Page;
