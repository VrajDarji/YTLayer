import React from "react";

interface VideoPlayerProps {
  videoId: string;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ videoId }) => {
  return (
    <div className="w-full aspect-video relative rounded-lg overflow-hidden shadow-sm">
      <iframe
        src={`https://youtube.com/embed/${videoId}`}
        className="absolute w-full h-full"
      ></iframe>
    </div>
  );
};

export default VideoPlayer;
