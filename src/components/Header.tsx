"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { ModeToggle } from "./mode-toggle";

const Header = () => {
  const [isSidenavOpen, setIsSidenavOpen] = useState(false);

  const toggleSidenav = () => {
    setIsSidenavOpen(!isSidenavOpen);
  };

  return (
    <header className="fixed top-0 left-0 right-0 flex justify-between p-2 dark:bg-black bg-white">
      {/* Side Navigation */}
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" onClick={toggleSidenav}>
            <Menu className="h-6 w-6" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="pr-0">
          <p className="pt-6">Login</p>
        </SheetContent>
      </Sheet>

      {/* Header Title */}
      <h1 className="text-xl font-semibold"> Genesis.Ai</h1>

      <ModeToggle />
    </header>
  );
};

export default Header;
