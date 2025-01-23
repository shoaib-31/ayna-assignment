import ChatWindow from "@/components/ChatWindow";
import React from "react";

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const sessionId = (await params).id;

  return (
    <div className="border bg-white rounded-lg flex-1 flex flex-col shadow-md p-4">
      <ChatWindow sessionId={sessionId} />
    </div>
  );
};

export default Page;
