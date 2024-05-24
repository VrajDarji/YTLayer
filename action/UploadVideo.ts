import { youtube, oauth } from "@/lib/google";
import fs from "fs";
import getAccessToken from "./getAccessToken";
const UploadVideoToYT = async ({
  title,
  media,
  description,
}: {
  title: string;
  media: File;
  description: string;
}) => {
  try {
    const accessToken = await getAccessToken();
    oauth.setCredentials({ access_token: accessToken });
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
    return youtube_response;
  } catch (err) {
    console.log("Server Error", err);
    throw new Error("Error");
  }
};

export default UploadVideoToYT;
