import { History } from "lucide-react";
import React from "react";

const ChatHistory = () => {
  const chatData = [
    { id: 1, title: "Chat with John", timestamp: "2025-01-20 14:30" },
    { id: 2, title: "Support Inquiry", timestamp: "2025-01-19 16:45" },
    { id: 3, title: "Project Discussion", timestamp: "2025-01-18 11:15" },
    { id: 4, title: "Team Meeting", timestamp: "2025-01-17 09:00" },
    { id: 5, title: "Random Conversation", timestamp: "2025-01-16 18:20" },
  ];

  return (
    <div className="w-[350px] bg-white h-full border rounded-lg overflow-hidden shadow-md">
      <div className="w-full py-4 gap-3 border-b text-xl font-semibold flex items-center justify-center">
        <History />
        History
      </div>
      <div className="flex flex-col divide-y overflow-y-auto h-full">
        {chatData.map((chat) => (
          <div
            key={chat.id}
            className="p-4 hover:bg-gray-100 cursor-pointer flex justify-between items-center"
          >
            <div>
              <p className="font-medium">{chat.title}</p>
              <p className="text-sm text-gray-500">{chat.timestamp}</p>
            </div>
            <div className="text-sm text-gray-400">→</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChatHistory;
