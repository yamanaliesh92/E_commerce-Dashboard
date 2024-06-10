"use client";
import Heading from "@/components/heading";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { PRoduct, Product, Store } from "@prisma/client";
import { Trash } from "lucide-react";
import * as z from "zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import toast from "react-hot-toast";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";

import ImageUpload from "@/components/ui/upload-image";
import AlertModal from "../../../settings/_components/alert-modal";

interface ProductFromProps {
  initialData: Product | null;
}

const formSchema = z.object({
  label: z.string().min(1),
  imgUrl: z.string().min(1),
});

type ProductFormValue = z.infer<typeof formSchema>;

export default function ProductFrom({ initialData }: ProductFromProps) {
  const params = useParams();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const title = initialData ? "Edit product" : "Create product";
  const description = initialData ? "Edit a product" : "Add a new product";
  const toastMessage = initialData ? "PRoduct updated." : "PRoduct created.";
  const action = initialData ? "Save changes" : "Create";

  const form = useForm<ProductFormValue>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      label: "",
      imgUrl: "",
    },
  });

  const onSubmit = async (data: ProductFormValue) => {
    try {
      setLoading(true);
      if (initialData) {
        await axios.patch(
          `http://localhost:3000/api/store/${params.storeId}/products/${params.productId}`,
          data
        );
      } else {
        await axios.post(
          `http://localhost:3000/api/store/${params.storeId}/products`,
          data
        );
      }
      router.push(`/${params.storeId}/products`);
      router.refresh();
      toast.success(toastMessage);
    } catch {
      toast.error("some thing went wrong");
    } finally {
      setLoading(false);
    }
  };

  const onDelete = async () => {
    try {
      setLoading(true);

      await axios.delete(
        `http://localhost:3000/api/${params.storeId}/products/${params.producId}`
      );

      router.push("/");
      router.refresh();
      toast.success("Product deleted.");
    } catch {
      toast.error(
        "Make sure you removed all categories using this product first."
      );
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onDelete}
        loading={loading}
      />
      <div className="flex items-center justify-between">
        <Heading title={title} description={description} />
        {initialData && (
          <Button
            disabled={loading}
            onClick={() => setOpen(true)}
            variant={"destructive"}
            size="sm"
          >
            <Trash className="h-4 w-4" />
          </Button>
        )}
      </div>
      <Separator />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full space-y-8"
        >
          <FormField
            control={form.control}
            name="imgUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Background image</FormLabel>
                <FormControl>
                  <ImageUpload
                    disabled={loading}
                    onChange={(url) => field.onChange(url)}
                    onRemove={() => field.onChange("")}
                    value={field.value ? [field.value] : []}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="grid grid-cols-3 gap-8">
            <FormField
              control={form.control}
              name="label"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Label</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="PRoduct label"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button disabled={loading} type="submit">
            {action}
          </Button>
        </form>
      </Form>
    </>
  );
}
