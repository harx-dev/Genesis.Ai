"use client";

import { useRef, useEffect } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Send } from "lucide-react";

interface InputFormProps {
  question: string;
  setQuestion: (value: string) => void;
  handleSubmit: (e: React.FormEvent) => void;
}

export default function Input({
  question,
  setQuestion,
  handleSubmit,
}: InputFormProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Resize textarea dynamically based on content
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "inherit";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [question]);

  // Check if the input is empty
  const isDisabled = question.trim() === "";

  return (
    <div className="fixed bottom-0 left-0 right-0 p-1 z-10 flex flex-col justify-center items-center dark:bg-background bg-white">
      <form
        onSubmit={(e) => {
          if (isDisabled) {
            e.preventDefault(); // Prevent form submission if input is empty
            return; // Exit the function if the input is empty
          }
          handleSubmit(e); // Call the submit handler if input is not empty
        }}
        className="relative w-full px-5"
      >
        <div className="relative">
          <Textarea
            ref={textareaRef}
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Type your Prompt..."
            className="pr-10 min-h-[40px] max-h-[300px] resize-none rounded-xl border-2"
            rows={1}
          />
          <button
            type="submit"
            className={`absolute right-3 bottom-2 transition-colors ${isDisabled ? "opacity-50 cursor-not-allowed" : ""}`}
            aria-label="Send message"
            disabled={isDisabled} // Disable the button if input is empty
          >
            <Send className="h-5 w-5" />
          </button>
        </div>
      </form>
      <p className="text-gray-400 text-[10px] pt-1">
      Genesis.Ai can make mistakes. Check important info.
      </p>
    </div>
  );
}
