"use client";

import Loading from "./Loader";

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
          <p className="mt-2 text-sm">
            Enter your prompt below to generate Code/Text.
          </p>
        </div>
      )}

      {loading && (
        <div className="w-full h-full flex justify-center items-center text-gray-400 text-center p-3">
          <Loading />
        </div>
      )}

      {/* Answer display */}
      {!initial && !loading && answer && (
        <div
          className="text-start p-4 rounded-lg text-sm  whitespace-pre-wrap"
          dangerouslySetInnerHTML={{ __html: answer }}
        />
      )}
    </div>
  );
}
