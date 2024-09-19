"use client"

import Loading from "./Loader";

interface ContentSectionProps {
  answer: string;
  loading: boolean;
}

export default function ContentSection({ answer, loading }: ContentSectionProps) {


  return (
    <div className="p-4 pt-16 w-full mx-auto overflow-x-auto pb-16">
      {loading ? (
        <Loading/>
      ) : (
        <pre
          className="text-start p-4 rounded-lg text-sm  whitespace-pre-wrap"
          dangerouslySetInnerHTML={{ __html: answer }}
        />
      )}
    </div>
  );
}
