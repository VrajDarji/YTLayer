import db from "@/database/drizzle";
import { RoleEnum, channels, members } from "@/database/schema";
import currentProfile from "@/lib/currentProfile";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";

export async function POST(req: Request) {
  try {
    const { id, name, imageUrl } = await req.json();
    const profile = await currentProfile();
    if (!profile) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    const channel = await db
      .insert(channels)
      .values({ id, name, imageUrl, userId: profile.id, inviteCode: uuidv4() });
    const channelAfterCreation = await db.query.channels.findFirst({
      where: eq(channels.userId, profile.id),
    });
    if (!channelAfterCreation) {
      throw new Error("Channel creation failed");
    }
    const member = await db.insert(members).values({
      id: uuidv4(),
      userId: profile.id,
      channelId: channelAfterCreation?.id,
      role: "creator",
      name: profile.name,
    });
    return NextResponse.json(channel);
  } catch (err) {
    console.log("Server ", err);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
