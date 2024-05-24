import { oauth, youtube } from "@/lib/google";
import getAccessToken from "./getAccessToken";
const getVideoDetails = async (id: string) => {
  const accessToken = await getAccessToken();
  oauth.setCredentials({
    access_token: accessToken,
  });
  try {
    const videosResponse = await youtube.videos.list({
      part: [
        "snippet",
        "statistics",
        "contentDetails",
        "processingDetails",
        "recordingDetails",
        "suggestions",
        "topicDetails",
      ],
      id: [id],
    });
    return {
      VideoStats: videosResponse.data.items,
    };
  } catch (err) {
    console.log("Server Error", err);
    throw new Error("Error");
  }
};

export default getVideoDetails;
