"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  prompt: z
    .string()
    .min(7, { message: "Prompt must be at least 7 characters long!" }),
});

interface ImageInputProps {
  onSubmit: (values: z.infer<typeof formSchema>) => void;
}

export default function ImageInput({ onSubmit }: ImageInputProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
    },
  });

  return (
    <div className="__form flex-[2] h-full gap-2 flex justify-center items-start flex-col pt-20">
      <p className="text-center w-full lg:text-left text-sm">
        Type your prompt below to create any Image!
      </p>
      <div className="flex gap-2 w-full">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full flex gap-2"
          >
            <FormField
              control={form.control}
              name="prompt"
              render={({ field }) => (
                <FormItem className="w-full max-w-full lg:max-w-[70%]">
                  <FormControl>
                    <Input
                      placeholder="A Dog Riding a Bike..."
                      className="w-full transition-all border-2"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Generate</Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
