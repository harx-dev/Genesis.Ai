"use client";

import { useState, useEffect } from "react";
import Header from "@/components/Header";
import ContentSection from "@/components/ContentSection";
import InputForm from "@/components/Input";
import Prism from "prismjs";
import "prismjs/themes/prism-tomorrow.css";
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-python";
import "prismjs/components/prism-css";
import "prismjs/components/prism-markup";
import "prismjs/components/prism-json";
import "prismjs/components/prism-bash";
import "prismjs/components/prism-java";

export default function Home() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (answer) {
      Prism.highlightAll();
    }
  }, [answer]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("/api/generate", {
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
      const initialresponse = result.response;

      // Regex to capture language and code inside triple backticks
      const codeRegex = /```(\w+)\n([\s\S]*?)```/g;

      const highlightedCode = initialresponse.replace(
        codeRegex,
        (match: string, language: string, code: string) => {
          const prismLanguage = Prism.languages[language]
            ? language
            : "plaintext";

          return `<pre class="p-4 rounded-lg shadow-md text-sm overflow-x-auto whitespace-pre-wrap"><code class="language-${prismLanguage}">${Prism.highlight(
            code,
            Prism.languages[prismLanguage],
            prismLanguage
          )}</code></pre>`;
        }
      );

      setAnswer(highlightedCode || initialresponse);
      setQuestion("");
      setLoading(false);
    } catch (error) {
      console.error("Error submitting:", error);
    }
  };

  return (
    <div className="flex flex-col h-screen">
      <Header />

      <ContentSection answer={answer} loading={loading} />

      <InputForm
        question={question}
        setQuestion={setQuestion}
        handleSubmit={handleSubmit}
      />
    </div>
  );
}
