"use client";

import { useEffect, useState } from "react";
import ContentSection from "@/components/ContentSection";
import InputForm from "@/components/Input";
import Prism from "prismjs";
import { marked } from "marked";
import "prismjs/themes/prism-tomorrow.css";

export default function TextGenerator() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("/api/text", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ question }),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const result = await response.json();
      const markdownContent = result.response;
      const htmlContent = await marked(markdownContent);
      setAnswer(htmlContent);
      setQuestion("");
      setLoading(false);
    } catch (error) {
      console.error("Error submitting:", error);
      setLoading(false);
      setAnswer("Server Down");
      setQuestion("");
    }
  };

  useEffect(() => {
    Prism.highlightAll(); // Highlight code blocks
  }, [answer]);

  return (
    <div className="flex flex-col h-screen">
      <ContentSection answer={answer} loading={loading} />

      <InputForm
        question={question}
        setQuestion={setQuestion}
        handleSubmit={handleSubmit}
      />
    </div>
  );
}
