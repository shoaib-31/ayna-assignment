"use client";
import InputArea from "@/components/InputArea";
import { useState } from "react";
import ayna from "@/assets/ayna.svg";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import ChatMessage from "@/components/ChatMessage";
import { Chat } from "@/interfaces/chat";

const Page = () => {
  const handleSend = async () => {
    setChat((prev) => [
      ...prev,
      {
        id: (Math.random() * 1000).toString().toString(),
        message: text,
        role: "user",
        timestamp: new Date(),
      },
    ]);
    setText("");
    await new Promise((resolve) =>
      setTimeout(() => resolve({ message: "Data Loaded!" }), 2000)
    );
    const { data, chatId }: { data: Chat; chatId: string } = {
      data: {
        id: (Math.random() * 1000).toString(),
        message: "chatbot",
        role: "bot",
        timestamp: new Date(),
      },
      chatId: (Math.random() * 1000).toString(),
    };
    setChat((prev) => [...prev, data]);
    window.history.pushState({}, "", `/chatbot/${chatId}`);
  };
  const [text, setText] = useState("");
  const [chat, setChat] = useState<Chat[]>([]);
  return (
    <div className="border bg-white rounded-lg flex-1 flex flex-col shadow-md p-4">
      <AnimatePresence>
        {chat.length == 0 ? (
          <motion.div
            initial={{ opacity: 0.2, filter: "blur(20px)" }}
            animate={{ opacity: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0.2, filter: "blur(20px)" }}
            transition={{ duration: 0.3 }}
            className=" flex flex-col items-center justify-center flex-1"
          >
            <div className=" flex flex-col justify-center items-center gap-4">
              <Image src={ayna} alt="ayna" width={300} height={300} />
              <div className="text-5xl font-light">
                Start chatting with our&nbsp;
                <span className=" font-semibold text-primary">AI Chatbot</span>
                &nbsp;!
              </div>
              <div className="flex items-center justify-center flex-1 text-lg font-light">
                Ask me anything!
              </div>
            </div>
          </motion.div>
        ) : (
          <div className=" flex flex-1 flex-col gap-1">
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
