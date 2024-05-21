import { oauth, youtubeAnalytics } from "@/lib/google";
import getAccessToken from "./getAccessToken";
const getReport = async () => {
  const accessToken = await getAccessToken();
  oauth.setCredentials({
    access_token: accessToken,
  });
  const endDate = new Date();
  const startDate = new Date();
  startDate.setDate(endDate.getDate() - 7);
  const formattedStartDate = startDate.toISOString().split("T")[0];
  const formattedEndDate = endDate.toISOString().split("T")[0];

  console.log(formattedStartDate);
  console.log(formattedEndDate);

  try {
    const { data } = await youtubeAnalytics.reports.query({
      ids: "channel==MINE",
      startDate: "2020-01-01",
      endDate: formattedEndDate,
      metrics:
        "views,likes,dislikes,estimatedMinutesWatched,averageViewDuration,comments,subscribersGained,subscribersLost",
      dimensions: "day",
      sort: "day",
    });
    let views = 0;
    let likes = 0;
    let dislikes = 0;
    let estimatedMinutesWatched = 0;
    let averageViewDuration = 0;
    let comments = 0;
    let subscribers = 0;
    if (data.rows) {
      data.rows.forEach((row) => {
        views += row[1];
        likes += row[2];
        dislikes += row[3];
        estimatedMinutesWatched += row[4];
        averageViewDuration += row[5];
        comments += row[6];
        subscribers += row[7];
        subscribers -= row[8];
      });
    }

    console.log(views);

    return {
      views,
      likes,
      dislikes,
      estimatedMinutesWatched,
      averageViewDuration,
      comments,
      subscribers,
    };
  } catch (err) {
    console.log("Server Error", err);
    throw new Error("Error");
  }
};

export default getReport;
