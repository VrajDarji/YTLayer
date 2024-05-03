"use client";
import React, { useEffect, useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import axios from "axios";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Loader } from "lucide-react";


const formSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1, {
    message: "Server name is required.",
  }),
  imageUrl: z.string().min(1, {
    message: "Server image is required.",
  }),
});

const IntialModal = () => {
  const [isMounted, setIsMounted] = useState(false);

  const router = useRouter();
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id: "",
      imageUrl: "",
      name: "",
    },
  });
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.post("/api/channel", values);
      form.reset();
      router.refresh();
    } catch (err) {
      console.error(err);
    }
  };
  const fetchChannels = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios.get("/api/youtube/analytics");
      const channelStats = data?.channelStats[0];
      console.log(channelStats);
      form.setValue("id", channelStats?.id);
      form.setValue("imageUrl", channelStats?.snippet?.thumbnails?.high?.url);
      form.setValue("name", channelStats?.snippet?.title);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    setIsMounted(true);
    fetchChannels();
  }, []);
  if (!isMounted) {
    return null;
  }
  return (
    <Dialog open>
      <DialogContent className="bg-white text-black p-0 overflow-hidden">
        <DialogHeader className="pt-8 px-6">
          <DialogTitle className="text-center text-2xl font-bold">
            Configure your initial organisation
          </DialogTitle>
          <DialogDescription className="text-center text-zinc-500">
            Welcome to YTLayer a youtube workplace for you and your team.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="space-y-8 px-6">
              <div className="flex items-center justify-center text-center">
                <FormField
                  control={form.control}
                  name="imageUrl"
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormControl>
                          <div className="w-15 aspect-square rounded-full flex justify-center items-center overflow-hidden">
                            {isLoading ? (
                              <>
                                <Loader className="animate-spin" />
                              </>
                            ) : (
                              <Image
                                src={field.value}
                                alt=""
                                width={60}
                                height={60}
                              />
                            )}
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    );
                  }}
                />
              </div>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormLabel className="uppercase text-xs font-bold text-zinc-500 dark:text-secondary/70">
                        Sever name
                      </FormLabel>
                      <FormControl>
                        <Input
                          disabled={isLoading}
                          className="bg-zinc-300/50 border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0"
                          placeholder="Enter server name"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />
            </div>
            <DialogFooter className="bg-gray-100 px-6 py-4">
              <Button variant={"primary"} disabled={isLoading}>
                {isLoading ? "crating.." : "create"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default IntialModal;
