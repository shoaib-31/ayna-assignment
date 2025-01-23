import { Send } from "lucide-react";
import React, { useRef } from "react";

const InputArea = ({
  text,
  setText,
  onSend,
}: {
  text: string;
  setText: (t: string) => void;
  onSend: () => void;
}) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);

    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${Math.min(
        textareaRef.current.scrollHeight,
        5 * 24
      )}px`;
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      onSend();
    }
  };

  return (
    <div className="flex items-end gap-3 px-2 py-2 md:py-4">
      {/* Responsive textarea */}
      <textarea
        ref={textareaRef}
        value={text}
        onKeyDown={handleKeyDown}
        onChange={handleInputChange}
        className="flex-1 p-3 md:p-4 border rounded-lg ring-0 focus-visible:ring-0 outline-none border-gray-200 resize-none overflow-hidden text-sm md:text-base"
        placeholder="Type a message..."
        rows={1}
        style={{ lineHeight: "1.5rem" }}
      />
      {/* Responsive send button */}
      <button
        onClick={onSend}
        className="p-2 md:p-3 bg-primary text-white rounded-lg flex items-center justify-center"
      >
        <Send className="w-6 h-6 md:w-8 md:h-8" />
      </button>
    </div>
  );
};

export default InputArea;
