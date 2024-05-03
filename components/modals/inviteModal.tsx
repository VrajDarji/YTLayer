"use client";

import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Check, Copy, RefreshCw } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";

import { useModal } from "@/hooks/useModal";
import { useOrigin } from "@/hooks/useOrigin";
import React, { useState } from "react";

const InviteModal = () => {
  const { isOpen, type, onOpen, onClose, data } = useModal();
  const [copied, setCopied] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(false);

  const { channel } = data;
  const isModalOpen = isOpen && type == "inviteModal";
  const origin = useOrigin();
  const inviteUrl = `${origin}/invite/${channel?.inviteCode}`;

  const onCopy = () => {
    navigator.clipboard.writeText(inviteUrl);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 1000);
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white text-black p-0 overflow-hidden">
        <DialogHeader className="pt-8 px-6">
          <DialogTitle className="text-center text-2xl font-bold">
            Invite your team members
          </DialogTitle>
        </DialogHeader>
        <div className="p-6">
          <Label className="uppercase text-xs font-bold text-zinc-500 dark:text-secondary/70">
            Organization invte link
          </Label>
          <div className="flex items-center mt-2 gap-x-2">
            <Input
              className="bg-zinc-300/50 border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0"
              value={inviteUrl}
              disabled={isLoading}
              readOnly
            />
            <Button
              disabled={isLoading}
              size={"icon"}
              onClick={() => {
                onCopy();
              }}
            >
              {copied ? (
                <Check className="h-4 w-4" />
              ) : (
                <Copy className="w-4 h-4 " />
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default InviteModal;
