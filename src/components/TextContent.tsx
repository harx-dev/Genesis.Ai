"use client";
import { Loader } from "lucide-react";
import React, { useEffect, useRef } from "react";
import ReactMarkdown from "react-markdown";
import { PrismLight as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/cjs/styles/prism";

interface TextContentSectionProps {
  answer: string;
  loading: boolean;
  initial: boolean;
}

export default function TextContent({
  answer,
  loading,
  initial,
}: TextContentSectionProps) {
  const contentRef = useRef<HTMLDivElement>(null);

  // Only auto-scroll when loading is true
  useEffect(() => {
    if (!contentRef.current || !loading) return;

    const scrollToBottom = () => {
      if (contentRef.current) {
        const { scrollHeight, clientHeight } = contentRef.current;
        contentRef.current.scrollTop = scrollHeight - clientHeight;
      }
    };

    // Scroll immediately
    scrollToBottom();

    // Set up an observer to watch for content changes
    const observer = new MutationObserver(scrollToBottom);
    
    observer.observe(contentRef.current, {
      childList: true,
      subtree: true,
      characterData: true
    });

    return () => observer.disconnect();
  }, [answer, loading]);

  return (
    <div 
      ref={contentRef} 
      className="p-4 w-full mx-auto overflow-y-auto scroll-smooth"
      style={{ maxHeight: 'calc(100vh - 100px)' }}
    >
      {initial && !loading && (
        <div className="w-full h-full flex justify-center items-center text-gray-400 text-center p-3 flex-col">
          <h1 className="text-2xl font-semibold pt-20">
            Welcome to the Text Generator!
          </h1>
          <p>Enter your prompt below to generate Code/Text.</p>
        </div>
      )}
      {!initial && (
        <div className="prose max-w-full pb-10">
          <ReactMarkdown
            components={{
              code({ className, children, ...rest }) {
                const match = /language-(\w+)/.exec(className || "");
                const languageMatch = match ? match[1] : "";
                
                if (!match) {
                  return (
                    <code className={className} {...rest}>
                      {children}
                    </code>
                  );
                }
                
                return (
                  <div style={{ position: "relative" }}>
                    <SyntaxHighlighter
                      style={vscDarkPlus}
                      language={languageMatch}
                      customStyle={{ margin: 0 }}
                    >
                      {String(children).replace(/\n$/, "")}
                    </SyntaxHighlighter>
                  </div>
                );
              },
            }}
          >
            {answer}
          </ReactMarkdown>
          {loading && (
            <div className="w-full flex items-center text-gray-500 text-sm mt-4 animate-pulse">
              <Loader className="animate-spin" />
              <span className="ml-2">Generating...</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}