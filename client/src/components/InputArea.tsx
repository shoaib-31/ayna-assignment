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
    <div className="flex items-end gap-3">
      <textarea
        ref={textareaRef}
        value={text}
        onKeyDown={handleKeyDown}
        onChange={handleInputChange}
        className="flex-1 p-4 border rounded-lg ring-0 focus-visible:ring-0 outline-none border-gray-200 resize-none overflow-hidden"
        placeholder="Type a message..."
        rows={1}
        style={{ lineHeight: "1.5rem" }}
      />
      <button onClick={onSend} className="p-3 bg-primary text-white rounded-lg">
        <Send size={30} />
      </button>
    </div>
  );
};

export default InputArea;
