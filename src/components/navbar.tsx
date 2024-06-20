import { db } from "@/lib/db";
import { UserButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import React from "react";
import MainNav from "./main-nav";
import StoreSwitcher from "./store-switcher";
import { ThemeToggle } from "./theme-toggle";

export default async function Navbar() {
  const { userId } = auth();
  if (!userId) {
    return redirect("/sign-in");
  }
  const stores = await db.store.findMany({ where: { userId } });

  return (
    <div className="border-b">
      <div className="flex items-center px-4 h-16">
        <StoreSwitcher items={stores} />
        <MainNav className="mx-4" />
        <div className="ml-auto flex items-center space-x-4">
          <ThemeToggle />
          <UserButton afterSignOutUrl="/" />
        </div>
      </div>
    </div>
  );
}
