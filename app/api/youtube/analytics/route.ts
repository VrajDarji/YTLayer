import getChannelStats from "@/action/getChannelStats";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const { channelStats } = await getChannelStats();
    return NextResponse.json(channelStats);
  } catch (err) {
    return new NextResponse("Server Error", { status: 501 });
  }
}
