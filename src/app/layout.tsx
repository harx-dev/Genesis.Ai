import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import Header from "@/components/Header";

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
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Header/>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
