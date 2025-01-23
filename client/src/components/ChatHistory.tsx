"use client";
import axiosInstance from "@/lib/axiosInstance";
import { History, LoaderCircle, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

interface Session {
  id: string;
  title: string;
  createdAt: string;
}

const ChatHistory = () => {
  const [sessionData, setSessionData] = useState<Session[]>([]);
  const [isVisible, setIsVisible] = useState(false); // State to toggle visibility

  const loadHistory = async () => {
    try {
      const { data } = await axiosInstance.get(
        "/api/sessions?sort[createdAt]=desc"
      );

      console.log(data.data);
      setSessionData(data.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    loadHistory();
  }, []);

  // Function to format date
  const formatDate = (isoDate: string): string => {
    const date = new Date(isoDate);
    return date.toLocaleString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Toggle visibility
  const toggleVisibility = () => {
    setIsVisible((prev) => !prev);
  };

  return (
    <>
      {/* Button to toggle history */}
      <button
        id="historyButton"
        className="fixed top-2 right-2 z-30 bg-primary text-white p-2 rounded-full shadow-lg md:hidden"
        onClick={toggleVisibility}
      >
        <History className="w-6 h-6 md:w-8 md:h-8" />
      </button>

      {/* Dark overlay */}
      {isVisible && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={toggleVisibility}
        ></div>
      )}

      {/* History Panel */}
      <div
        className={`fixed top-0 right-0 w-[300px] h-full bg-white shadow-md transform transition-transform duration-300 z-40 ${
          isVisible ? "translate-x-0" : "translate-x-full"
        } md:translate-x-0 md:relative md:flex md:w-[350px]`}
      >
        <div className="w-full flex flex-col h-full border rounded-lg overflow-hidden">
          <div className="w-full py-4 gap-3 border-b text-xl font-semibold flex items-center justify-between px-4">
            <div className="flex items-center gap-2">
              <History />
              History
            </div>
            <button
              className="md:hidden text-gray-500 hover:text-black"
              onClick={toggleVisibility}
            >
              <X className="w-6 h-6" />
            </button>
          </div>
          <div className="custom-scrollbar flex flex-1 flex-col divide-y overflow-y-auto h-full">
            {sessionData.length == 0 ? (
              <div className="w-full h-full flex-col gap-2 flex items-center justify-center">
                <LoaderCircle className="animate-spin text-primary w-16 h-16" />
                <p className="text-sm md:text-base text-gray-700">
                  Loading History...
                </p>
              </div>
            ) : (
              sessionData.map((chat) => (
                <Link href={`/chatbot/${chat.id}`} key={chat.id}>
                  <div className="p-4 hover:bg-gray-100 cursor-pointer flex justify-between items-center">
                    <div>
                      <p className="font-medium text-base md:text-lg">
                        {chat.title}
                      </p>
                      <p className="text-sm md:text-base text-gray-500">
                        {formatDate(chat.createdAt)}
                      </p>
                    </div>
                    <div className="text-sm text-gray-400">→</div>
                  </div>
                </Link>
              ))
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ChatHistory;
