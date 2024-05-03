import { NextRequest, NextResponse } from "next/server";
import { google } from "googleapis";
import { auth, clerkClient } from "@clerk/nextjs";

const oauth = new google.auth.OAuth2({
  clientId: process.env.GOOGLE_CLIENT_ID as string,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
  redirectUri: "http://localhost:3000/api/auth/callback/google",
});

const youtubeAnalytics = google.youtube({
  version: "v3",
  auth: oauth,
});

export async function GET(req: NextRequest) {
  const { userId } = auth();
  if (!userId) {
    return new NextResponse("Unauthorized", { status: 404 });
  }
  const clerkResponse = await clerkClient.users.getUserOauthAccessToken(
    userId as string,
    "oauth_google"
  );
  const accessToken = clerkResponse[0].token;
  oauth.setCredentials({
    access_token: accessToken,
  });
  const channelList = await youtubeAnalytics.channels.list({
    part: ["contentDetails", "snippet", "statistics"],
    mine: true,
  });
  const uploadsId =
    channelList.data.items?.[0].contentDetails?.relatedPlaylists?.uploads;
  if (!uploadsId) {
    return new NextResponse("No uploads found", { status: 400 });
  }
  const playListItems = await youtubeAnalytics.playlistItems.list({
    part: ["contentDetails"],
    playlistId: uploadsId,
    maxResults: 13,
  });
  const videoIds: string[] = [];
  playListItems.data.items?.map((item) => {
    videoIds.push(item.contentDetails?.videoId as string);
  });
  const videosResponse = await youtubeAnalytics.videos.list({
    part: ["snippet", "statistics"],
    id: videoIds,
  });
  const response: any = [];
  videosResponse.data.items?.map((item) => {
    const schema: {
      snippet: any;
      statistics: any;
    } = { snippet: item.snippet, statistics: item.statistics };

    response.push(schema);
  });
  return NextResponse.json({
    VideoStats: response,
    channelStats: channelList.data.items,
  });
}
