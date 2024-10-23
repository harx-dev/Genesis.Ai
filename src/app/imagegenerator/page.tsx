"use client";

import React, { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import ImageContent from "@/components/ImageContent";
import ImageInput from "@/components/ImageInput";
import { z } from "zod";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Page() {
  const [outputImg, setOutputImg] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [initialPage, setInitialPage] = useState(true);
  const [serverError, setServerError] = useState("");
  const { status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  const { toast } = useToast();

  const formSchema = z.object({
    prompt: z
      .string()
      .min(7, { message: "Prompt must be at least 7 characters long!" }),
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setInitialPage(false);
      setLoading(true);
      const response = await fetch("/api/image", {
        method: "POST",
        body: JSON.stringify(values),
      });
      const data = await response.json();
      if (response.status === 200) {
        setOutputImg(data.url);
      } else {
        setServerError("Failed to generate image try again");
        toast({ variant: "destructive", description: data.error });
      }
    } catch (error) {
      setServerError("An error occurred while fetching the image");
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex w-full gap-3 lg:h-[calc(100dvh-200px)] md:flex-row flex-col-reverse pt-20 p-4">
      <ImageInput onSubmit={onSubmit} />
      <ImageContent
        outputImg={outputImg || ""}
        loading={loading}
        initialPage={initialPage}
        serverError={serverError}
      />
    </div>
  );
}
