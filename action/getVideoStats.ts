import { oauth, youtube } from "@/lib/google";
import getAccessToken from "./getAccessToken";
const getVideoStats = async () => {
  const accessToken = await getAccessToken();
  oauth.setCredentials({
    access_token: accessToken,
  });
  try {
    const channelList = await youtube.channels.list({
      part: ["contentDetails", "snippet", "statistics"],
      mine: true,
    });
    const uploadsId =
      channelList.data.items?.[0].contentDetails?.relatedPlaylists?.uploads;
    if (!uploadsId) {
      throw new Error("No uploads found");
    }
    const playListItems = await youtube.playlistItems.list({
      part: ["contentDetails"],
      playlistId: uploadsId,
      maxResults: 13,
    });
    const videoIds: string[] = [];
    playListItems.data.items?.map((item) => {
      videoIds.push(item.contentDetails?.videoId as string);
    });
    const videosResponse = await youtube.videos.list({
      part: ["snippet", "statistics"],
      id: videoIds,
    });
    const response: any = [];
    console.log(videosResponse.data);
    videosResponse.data.items?.map((item) => {
      const schema: {
        snippet: any;
        statistics: any;
        id: string;
      } = {
        snippet: item.snippet,
        statistics: item.statistics,
        id: item.id as string,
      };
      response.push(schema);
    });

    return {
      VideoStats: response,
    };
  } catch (err) {
    console.log("Server Error", err);
    throw new Error("Error");
  }
};

export default getVideoStats;
