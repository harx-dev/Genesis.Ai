"use client";

import React from "react";
import { Cross2Icon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";

interface SideNavProps {
  toggleSidenav: () => void;
  isOpen: boolean; // Add this prop to track if the sidenav is open
}

const SideNav: React.FC<SideNavProps> = ({ toggleSidenav, isOpen }) => {
  const { status } = useSession();

  return (
    <div
      className={`fixed left-0 top-0 w-[70%] h-full z-[1001] border-r dark:bg-black bg-white ease-in-out duration-500 overflow-y-auto transform ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div className="flex flex-row-reverse p-1">
        <Button variant="ghost" size="icon" onClick={toggleSidenav}>
          <Cross2Icon className="h-6 w-6" />
          <span className="sr-only">Close</span>
        </Button>
      </div>
      <nav className="lg:hidden gap-6 flex flex-col items-center mt-6">
        <Link
          className="text-sm font-medium hover:text-gray-400"
          href="/textgenerator"
          onClick={toggleSidenav}
        >
          Text Generator
        </Link>
        <Link
          className="text-sm font-medium hover:text-gray-400"
          href="/imagegenerator"
          onClick={toggleSidenav}
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
              onClick={toggleSidenav}
            >
              Login
            </Link>
          </Button>
        )}
      </nav>
    </div>
  );
};

export default SideNav;
