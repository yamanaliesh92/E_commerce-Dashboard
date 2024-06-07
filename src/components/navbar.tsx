import { UserButton } from "@clerk/nextjs";
import React from "react";
import MainNav from "./main-nav";

export default function Navbar() {
  return (
    <div className="border-b">
      <div className="flex items-center px-4 h-16">
        <div>This will be a store switcher</div>
        <MainNav className="mx-4" />
        <div className="ml-auto flex items-center space-x-4">
          <UserButton afterSignOutUrl="/" />
        </div>
      </div>
    </div>
  );
}
