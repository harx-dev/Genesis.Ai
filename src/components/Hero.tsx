import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const Hero = () => {
  return (
    <div>
      <section className="w-full py-20 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center">
          <div className="absolute inset-0 -z-10 h-full w-full  dark:bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] bg-[radial-gradient(#000000_1px,transparent_1px)] [background-size:40px_40px]  [mask-image:radial-gradient(ellipse_40%_40%_at_50%_50%,#000_20%,transparent_120%)]"></div>
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                Supercharge Your Business with AI-Powered Assistance
              </h1>
              <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                Generate text and images with our cutting-edge AI technology.
                Boost your creativity and productivity.
              </p>
            </div>
            <div className="space-y-4 sm:space-y-0 sm:space-x-4">
              <Button asChild size="lg">
                <Link href="/textgenerator">Try Text Generator</Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="/imagegenerator">Try Image Generator</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Hero;
