import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bot, Zap, Shield } from "lucide-react";

const KeyFeature = () => {
  return (
    <div>
      <section
        id="features"
        className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-black"
      >
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-12">
            Key AI Features
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <Bot className="h-8 w-8 mb-2 text-primary" />
                <CardTitle>Intelligent Model</CardTitle>
              </CardHeader>
              <CardContent>
                Gemini 1.5 Flash powered Ai Code Generation that understand
                context and provide human-like responses.
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <Zap className="h-8 w-8 mb-2 text-primary" />
                <CardTitle>Image Processing</CardTitle>
              </CardHeader>
              <CardContent>
                Uses Pollination an open-source LLMs,to generate high quality
                image.
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <Shield className="h-8 w-8 mb-2 text-primary" />
                <CardTitle>Enhanced Security</CardTitle>
              </CardHeader>
              <CardContent>
                Secure Login Before Generating any text/image for tracing.
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

export default KeyFeature;
