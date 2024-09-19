"use client";

import React from "react";
import { Loader } from "lucide-react";

const Loading = () => {
  return (
    <div className="flex items-center justify-center pt-32">
      <Loader className="w-10 h-10 animate-spin text-neutral-400" />
    </div>
  );
};

export default Loading;