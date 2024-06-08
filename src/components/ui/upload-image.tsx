"use client";
import { ImagePlus, Trash } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Button } from "./button";
import { CldUploadWidget } from "next-cloudinary";

interface UploadImageProps {
  value: string[];
  disabled?: boolean;
  onRemove: (value: string) => void;
  onChange: (value: string) => void;
}

export default function ImageUpload({
  value,
  onChange,
  onRemove,
  disabled,
}: UploadImageProps) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => setIsMounted(true), []);

  const onUpload = (result: any) => {
    // console.log("result", result.info);
    onChange(result.info.secure_url);
  };

  if (!isMounted) {
    return null;
  }

  console.log("DDDDDDDDDDDDDDDDDDD", value);

  return (
    <div>
      <div className="mb-4 flex items-center gap-4">
        {value.map((url) => (
          <div
            key={url}
            className="w-[200px] relative h-[200px] rounded-md overflow-hidden"
          >
            <div className="z-10 absolute top-2 right-2">
              <Button
                type={"button"}
                onClick={() => onRemove(url)}
                variant={"destructive"}
              >
                <Trash className="h-4 w-4" />
              </Button>
            </div>
            <Image
              alt="Image"
              width={200}
              height={200}
              className="object-cover"
              src={url}
            />
          </div>
        ))}
      </div>
      <CldUploadWidget uploadPreset="j0am2dyf" onUpload={onUpload}>
        {({ open }) => {
          const onClick = () => {
            open();
          };
          return (
            <Button
              disabled={disabled}
              type="button"
              variant={"secondary"}
              onClick={onClick}
            >
              <ImagePlus className="w-4 h-4 mr-2" />
              Upload an image
            </Button>
          );
        }}
      </CldUploadWidget>
    </div>
  );
}
