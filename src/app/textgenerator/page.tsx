"use client";

import { useEffect, useState } from "react";
import TextContent from "@/components/TextContent";
import TextInput from "@/components/TextInput";
import Prism from "prismjs";
import { marked } from "marked";
import "prismjs/themes/prism-tomorrow.css";

export default function TextGenerator() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);
  const [initial, setInitial] = useState(true);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setInitial(false);
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
    } catch (error) {
      console.error("Error submitting:", error);
      setAnswer("Server Down");
      setQuestion("");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    Prism.highlightAll(); // Highlight code blocks
  }, [answer]);

  return (
    <div className="flex flex-col h-screen">
      <TextContent answer={answer} loading={loading} initial={initial} />

      <TextInput
        question={question}
        setQuestion={setQuestion}
        handleSubmit={handleSubmit}
      />
    </div>
  );
}
