"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { ModeToggle } from "./mode-toggle";
import Link from "next/link";
import SideNav from "./SideNav";
import { BrainCircuit } from "lucide-react";
import { signOut, useSession } from "next-auth/react";

const Header = () => {
  const [sidenavOpen, setSidenavOpen] = useState<boolean>(false);

  const { status } = useSession();

  const toggleSidenav = () => {
    setSidenavOpen(!sidenavOpen);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-[1002] flex justify-between p-2 dark:bg-black bg-white border-b border-gray-600/60">
      {/* Side Navigation */}
      {sidenavOpen && <SideNav toggleSidenav={toggleSidenav} />}

      <Button
        className="md:hidden"
        variant="ghost"
        size="icon"
        onClick={toggleSidenav}
      >
        <Menu className="h-6 w-6" />
      </Button>

      {/* Header Title */}
      <Link href="/" className="flex items-center">
        <BrainCircuit className="h-6 w-6  text-primary" />
        <h1 className="text-xl font-semibold">Genesis.Ai</h1>
      </Link>
      <nav className="ml-auto lg:flex gap-4 mt-2 mx-2 hidden">
        <Link
          className="text-sm font-medium hover:text-gray-400 "
          href="/textgenerator"
        >
          Text Generator
        </Link>
        <Link
          className="text-sm font-medium hover:text-gray-400"
          href="/imagegenerator"
        >
          Image Generator
        </Link>
        {status === "authenticated" ? (
          <Button className="h-6" onClick={() => signOut()}>
            Logout
          </Button>
        ) : (
          <Button className="h-6">
            <Link
              className="text-sm font-medium hover:text-gray-400"
              href="/login"
            >
              Login
            </Link>
          </Button>
        )}
      </nav>

      <div>
        <ModeToggle />
      </div>
    </header>
  );
};

export default Header;
