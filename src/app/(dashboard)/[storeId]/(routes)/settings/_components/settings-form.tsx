"use client";
import Heading from "@/components/heading";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Store } from "@prisma/client";
import { Trash } from "lucide-react";
import React from "react";

interface SettingsFromProps {
  initialData: Store;
}

export default function SettingsForm({ initialData }: SettingsFromProps) {
  return (
    <>
      <div className="flex items-center justify-between">
        <Heading title="Settings" description="Manage store preferences" />
        <Button variant={"destructive"} size="sm">
          <Trash className="h-4 w-4" />
        </Button>
      </div>
      <Separator />
    </>
  );
}
