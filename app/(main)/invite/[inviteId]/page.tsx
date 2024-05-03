import currentProfile from "@/lib/currentProfile";
import React from "react";
import { redirect } from "next/navigation";
import db from "@/database/drizzle";
import { and, eq } from "drizzle-orm";
import { v4 as uuidv4 } from "uuid";
import { channels, members } from "@/database/schema";

const page = async ({ params }: { params: { inviteId: string } }) => {
  const profile = await currentProfile();
  if (!profile) {
    return redirect("/sign-in");
  }
  if (!params.inviteId) {
    return redirect("/");
  }
  const existingMember = await db.query.members.findFirst({
    where: eq(members.userId, profile.id),
  });
  const existingChannel = await db.query.channels.findFirst({
    where: and(eq(channels.inviteCode, params.inviteId)),
  });
  if (existingChannel && existingChannel) {
    return redirect(`/channels/${existingChannel.id}`);
  }
  const channel = await db.query.channels.findFirst({
    where: eq(channels.inviteCode, params.inviteId),
  });
  const member = await db.insert(members).values({
    id: uuidv4(),
    userId: profile.id,
    channelId: channel?.id as string,
    role: "member",
    name: profile.name,
  });
  return redirect(`/channels/${channel?.id}`);
};

export default page;
