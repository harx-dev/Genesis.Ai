import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Bot,
  BrainCircuit,
  MessageSquare,
  BarChart,
  Zap,
  Shield,
} from "lucide-react";

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
                Gemini 1.5 Flash powered Generation that understand context and provide
                human-like responses.
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <MessageSquare className="h-8 w-8 mb-2 text-primary" />
                <CardTitle>Natural Language Processing</CardTitle>
              </CardHeader>
              <CardContent>
                Analyze and extract insights from text data, including sentiment
                analysis and entity recognition.
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <BarChart className="h-8 w-8 mb-2 text-primary" />
                <CardTitle>Predictive Analytics</CardTitle>
              </CardHeader>
              <CardContent>
                Leverage machine learning models to forecast trends and make
                data-driven business decisions.
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <Zap className="h-8 w-8 mb-2 text-primary" />
                <CardTitle>Automated Workflows</CardTitle>
              </CardHeader>
              <CardContent>
                Streamline business processes with AI-powered automation,
                reducing manual tasks and improving efficiency.
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <Shield className="h-8 w-8 mb-2 text-primary" />
                <CardTitle>Enhanced Security</CardTitle>
              </CardHeader>
              <CardContent>
                Implement AI-driven security measures to detect and prevent
                potential threats to your business.
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <BrainCircuit className="h-8 w-8 mb-2 text-primary" />
                <CardTitle>Continuous Learning</CardTitle>
              </CardHeader>
              <CardContent>
                Our AI models continuously learn and improve from your data,
                providing increasingly accurate insights over time.
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

export default KeyFeature;
