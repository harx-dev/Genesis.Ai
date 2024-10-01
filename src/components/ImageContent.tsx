"use client";

import Loading from "./Loader";
import Image from "next/image";

interface ImageContentSectionProps {
  outputImg: string | null;
  loading: boolean;
  initialPage: boolean;
}

export default function ImageContent({
  outputImg,
  loading,
  initialPage,
}: ImageContentSectionProps) {
  return (
    <div className="__output min-h-[300px] min-w-[300px]  dark:bg-white/5 bg-black/5 rounded-lg items-center justify-center overflow-hidden text-center">
      {initialPage && !loading && (
        <p className="w-full h-full flex justify-center items-center text-gray-400 text-center p-3 pt-32 lg:pt-4">
          Enter your prompt and hit generate!
        </p>
      )}

      {loading && (
        <div className="w-full h-full flex justify-center items-center text-gray-400 text-center p-3 pt-32 lg:pt-4">
          <Loading />
        </div>
      )}

      {!initialPage && !loading && outputImg && (
        <>
          <Image
            alt="output"
            className="w-full h-full object-contain"
            src={outputImg}
            width={300}
            height={300}
          />
        </>
      )}
    </div>
  );
}
