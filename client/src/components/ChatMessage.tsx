import { cn } from "@/lib/utils";
import React from "react";
import { motion } from "framer-motion";

const ChatMessage = ({
  role,
  message,
  timestamp,
}: {
  role: "bot" | "user";
  message: string;
  timestamp: Date;
}) => {
  return (
    <motion.div
      className="flex flex-col gap-2 items-start"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 30,
      }}
    >
      <div
        className={cn(
          "text-white p-1 flex w-full",
          role === "bot" ? "justify-start" : "justify-end self-end"
        )}
      >
        {role === "user" ? (
          <div className="p-2 ml-2 relative flex flex-col gap-1 rounded-lg rounded-br-none bg-primary text-base md:text-lg sm:text-sm">
            <span className="absolute bottom-0 border-[6px] border-r-transparent border-t-transparent border-primary z-10 -right-2"></span>
            {message}
            <div className="text-xs text-right text-gray-100">
              {timestamp.toLocaleTimeString()}
            </div>
          </div>
        ) : (
          <div className="p-2 mr-2 rounded-lg bg-gray-100 flex flex-col gap-1 relative rounded-bl-none text-gray-800 text-base md:text-lg sm:text-sm">
            <span className="absolute bottom-0 border-[6px] border-l-transparent border-t-transparent border-gray-100 z-10 -left-2"></span>
            {message}
            <div className="text-xs text-left text-gray-600">
              {timestamp.toLocaleTimeString()}
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default ChatMessage;
