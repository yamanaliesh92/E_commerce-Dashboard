import { UserButton } from "@clerk/nextjs";
import React from "react";

export default function Navbar() {
  return (
    <div className="border-b">
      <div className="flex items-center px-4 h-16">
        <div>This will be a store switcher</div>
        <div>This is will be the route</div>
        <div className="ml-auto flex items-center space-x-4">
          <UserButton />
        </div>
      </div>
    </div>
  );
}
