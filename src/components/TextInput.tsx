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
}

export default function TextInput({
  question,
  setQuestion,
  onSubmit,
  loading,
}: TextInputProps) {
  const isDisabled = question.trim() === "";
  return (
    <form onSubmit={onSubmit} className="mb-4">
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
          {loading ? "Generating..." : <Send className="h-5 w-5" />}
        </Button>
      </div>
    </form>
  );
}
