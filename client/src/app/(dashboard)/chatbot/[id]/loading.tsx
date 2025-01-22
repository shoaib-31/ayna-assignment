import { LoaderCircle } from "lucide-react";
import React from "react";

const Loading = () => {
  return (
    <div className=" flex-1 flex justify-center text-xl items-center">
      <div className=" flex-col gap-4 flex items-center justify-center">
        <LoaderCircle className=" animate-spin text-primary" size={64} />
        Please wait while we load chats...
      </div>
    </div>
  );
};

export default Loading;
