"use client";
import Heading from "@/components/heading";
import { Store } from "@prisma/client";
import React from "react";

interface SettingsFromProps {
  initialData: Store;
}

export default function SettingsForm({ initialData }: SettingsFromProps) {
  return (
    <div className="flex items-center justify-between">
      <Heading title="Settings" description="Manage store preferences" />
    </div>
  );
}
