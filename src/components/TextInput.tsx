"use client";
import React from "react";
import { Send } from "lucide-react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

interface TextInputProps {
  question: string;
  setQuestion: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  loading: boolean;
  handleStop: () => void;
}

export default function TextInput({
  question,
  setQuestion,
  onSubmit,
  loading,
  handleStop,
}: TextInputProps) {
  const isDisabled = question.trim() === "";
  return (
    <div className="fixed bottom-0 z-50 w-full bg-white dark:bg-background p-1 justify-center items-center">
      <form onSubmit={onSubmit} className="m-2">
        <div className="flex space-x-2">
          <Input
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Enter your prompt here..."
            className="flex-grow p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={loading}
          />
          <Button
            type="submit"
            className={`transition-colors ${
              isDisabled ? "opacity-50 cursor-not-allowed" : ""
            }`}
            aria-label="Send message"
            disabled={isDisabled}
          >
            {loading ? (
              <button className="" onClick={handleStop}>
                Stop
              </button>
            ) : (
              <Send className="h-5 w-5" />
            )}
          </Button>
        </div>
      </form>
      <p className="text-gray-400 text-[10px] flex justify-center items-center">
        Genesis.Ai can make mistakes. Check important info.
      </p>
    </div>
  );
}
