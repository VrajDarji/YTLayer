import getVideoDetails from "@/action/getVideoDetails";
import UploadVideo from "@/components/UploadVideo";
import React from "react";

const page = async ({ params }: { params: { videoId: string } }) => {
  const getVideoStats = (await getVideoDetails(params.videoId)).VideoStats;
  return (
    <div>
      <UploadVideo data={getVideoStats} />
    </div>
  );
};

export default page;
