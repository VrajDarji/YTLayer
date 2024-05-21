import React from "react";

interface VideoPlayerProps {
  videoId: string;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ videoId }) => {
  return (
    <iframe
      src={`https://youtube.com/embed/${videoId}`}
      className="w-full aspect-video relative rounded-lg overflow-hidden shadow-sm"
    ></iframe>
  );
};

export default VideoPlayer;
