import ChatHistory from "@/components/ChatHistory";
import React from "react";

const Layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className="flex flex-1 h-full overflow-hidden justify-between mx-4 my-2 gap-3">
      {children}
      <ChatHistory />
    </div>
  );
};

export default Layout;
