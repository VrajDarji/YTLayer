import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import { auth, clerkClient } from "@clerk/nextjs";
import { oauth, youtube } from "@/lib/google";
import getAccessToken from "@/action/getAccessToken";

export async function POST(req: NextRequest) {
  try {
    const accessToken = await getAccessToken();
    if (!accessToken) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    const formData = await req.formData();
    const title = formData.get("title");
    const description = formData.get("description");
    const media = formData.get("media") as File;

    if (!title || !description || !media) {
      return new NextResponse("Important data/field missing", { status: 400 });
    }
    oauth.setCredentials({
      access_token: accessToken,
    });

    const tempFilePath = "public/video/demo.mp4";
    const readStream = await fs.promises.readFile(tempFilePath);
    const arrayBuffer = await media.arrayBuffer();
    await fs.promises.writeFile(tempFilePath, Buffer.from(arrayBuffer));
    const youtube_response = await youtube.videos.insert({
      part: ["snippet", "status"],
      requestBody: {
        snippet: {
          title: title as string,
          description: description as string,
        },
        status: {
          privacyStatus: "public",
        },
      },
      media: {
        mimeType: media.type,
        body: fs.createReadStream(tempFilePath),
      },
    });

    await fs.promises.writeFile(tempFilePath, readStream);
    return NextResponse.json(youtube_response.data);
  } catch (err) {
    console.log("Server Error", err);
    return new NextResponse("Failed to upload error", { status: 500 });
  }
}
