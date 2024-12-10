"use client";
import { useEffect, useState, useRef, useCallback } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import TextContent from "@/components/TextContent";
import TextInput from "@/components/TextInput";

export default function TextGenerator() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);
  const [initial, setInitial] = useState(true);
  const abortControllerRef = useRef<AbortController | null>(null);
  const { status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();

    // Abort any existing request
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    // Create a new abort controller
    abortControllerRef.current = new AbortController();
    const signal = abortControllerRef.current.signal;

    setInitial(false);
    setLoading(true);
    setAnswer(""); // Reset answer

    try {
      const response = await fetch("/api/text", {
        method: "POST",
        signal,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ question }),
      });

      if (!response.body) {
        throw new Error("ReadableStream not supported");
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();

      while (true) {
        const { done, value } = await reader.read();

        if (done) break;

        // Decode the chunk
        const chunk = decoder.decode(value, { stream: true });

        // Update answer immediately
        setAnswer((prevAnswer) => prevAnswer + chunk);
      }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      if (error.name === "AbortError") {
        console.log("Request was aborted");
      } else {
        console.error("Error submitting:", error);
        setAnswer("An error occurred while generating response");
      }
    } finally {
      setLoading(false);
      setQuestion("");
      abortControllerRef.current = null;
    }
  }, [question]);

  const handleStop = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      setLoading(false);
    }
  };

  return (
    <div className="w-full h-screen flex flex-col">
      <h1 className="text-3xl font-bold mb-6 text-center">Text Generator</h1>

      <div className="flex-1 overflow-y-auto max-w-full">
        <TextContent answer={answer} loading={loading} initial={initial} />
      </div>

      <div className="mt-auto">
        <TextInput
          question={question}
          setQuestion={setQuestion}
          onSubmit={handleSubmit}
          loading={loading}
        />
      </div>
    </div>
  );
}
