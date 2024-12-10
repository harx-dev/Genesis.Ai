"use client";
import React, { useEffect, useState, useRef, useCallback } from "react";
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/cjs/styles/prism';

// TextContent Component
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
  return (
    <div className="p-4 pt-16 w-full mx-auto overflow-x-auto pb-16">
      {initial && !loading && (
        <div className="w-full h-full flex justify-center items-center text-gray-400 text-center p-3 flex-col">
        <h1 className="text-2xl font-semibold pt-20">
          Welcome to the Text Generator!
        </h1>
          <p>Enter your prompt below to generate Code/Text.</p>
        </div>
      )}
      
      {/* {loading && (
        <div className="flex justify-center items-center h-full">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      )} */}
      
      {!initial && (
        <div className="prose max-w-full">
          <ReactMarkdown
            components={{
              code({ node, inline, className, children, ...props }) {
                const match = /language-(\w+)/.exec(className || '');
                return !inline && match ? (
                  <SyntaxHighlighter
                    style={vscDarkPlus}
                    language={match[1]}
                    PreTag="div"
                    {...props}
                  >
                    {String(children).replace(/\n$/, '')}
                  </SyntaxHighlighter>
                ) : (
                  <code className={className} {...props}>
                    {children}
                  </code>
                );
              },
            }}
          >
            {answer}
          </ReactMarkdown>
          {loading && (
            <div className="absolute bottom-2 right-2 text-gray-500 text-sm">
              Generating...
            </div>
          )}
        </div>
      )}
    </div>
  );
}