import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import Header from "@/components/Header";
import Provider from "./provider";

export const metadata: Metadata = {
  title: "Genesis Ai",
  description: "Genesis Ai Code/Text Generator",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/brain-circuit.svg" />
      </head>
      <body className={`$antialiased dark:bg-background`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <Provider>
            <Header />
            {children}
          </Provider>
        </ThemeProvider>
      </body>
    </html>
  );
}
