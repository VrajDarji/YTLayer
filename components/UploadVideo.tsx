"use client";
import { youtube_v3 } from "googleapis";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { CircleCheckBig, CircleX, LoaderCircle, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface UploadVideoProps {
  data?: youtube_v3.Schema$Video[] | undefined;
}

const UploadVideo: React.FC<UploadVideoProps> = ({ data }) => {
  const [isUploaded, setIsUploaded] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [title, setTitle] = useState<string>(
    data?.[0]?.snippet?.localized?.title as string
  );
  const [description, setDescription] = useState<string>(
    data?.[0]?.snippet?.localized?.description as string
  );
  const [media, setMedia] = useState<File | null>(null);
  const [mediaPreview, setMediaPreview] = useState<string | null>(null);
  const [videoId, setVideoId] = useState<string>("");
  const uploadVideo = async () => {
    try {
      setIsLoading(true);
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      if (media) {
        formData.append("media", media);
      }

      const response = await axios.post("/api/youtube/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      const rsp_data = response.data;
      if (response.status === 200) {
        setIsUploaded(true);
        console.log(rsp_data);
        setVideoId(rsp_data?.id);
      } else {
        setIsUploaded(false);
      }
    } catch (error) {
      setIsUploaded(false);
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {isLoading && !isUploaded && (
        <div className="fixed top-0 z-10 left-0 min-h-[100vh] min-w-[100vw] bg-gray-700 bg-opacity-50 flex items-center justify-center">
          <LoaderCircle className="animate-spin text-8xl" />
        </div>
      )}
      <>
        {isUploaded && (
          <div className="fixed top-0 left-0 min-h-[100vh] min-w-[100vw] flex items-center justify-center z-20">
            <div className="p-6 rounded-md shadow-md bg-gray-200 dark:bg-zinc-800 flex flex-col gap-y-4 relative">
              <X
                className="p-1 rounded-full text-white bg-rose-400 absolute top-4 right-4 cursor-pointer"
                size={20}
                onClick={() => setIsUploaded(false)}
              />
              <CircleCheckBig className="text-emerald-400" size={25} />
              <p>Video Successfully Uploaded</p>
              <a
                href={`http://youtube.com/watch?v=${videoId}`}
                className="text-indigo-400 underline"
              >
                Video Link
              </a>
            </div>
          </div>
        )}
        {isError && (
          <div className="fixed top-0 left-0 min-h-[100vh] min-w-[100vw] flex items-center justify-center z-10">
            <div className="p-6 rounded-md shadow-md bg-gray-200 dark:bg-zinc-800 flex flex-col gap-y-4 relative">
              <X
                className="p-1 rounded-full text-white bg-rose-400 absolute top-4 right-4 cursor-pointer"
                size={20}
                onClick={() => setIsError(false)}
              />
              <CircleX className="text-rose-400" size={25} />
              <p>An error occured.Failed to upload Video</p>
            </div>
          </div>
        )}
        <div className="flex flex-col p-8 gap-y-4 items-start w-full">
          <p className="text-xl -pb-2">Title</p>
          <input
            type="text"
            placeholder="Enter Title"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
              console.log(title);
            }}
            className="px-4 py-3 rounded-md outline-none focus:ring-1 ring-white w-full"
          />
          <p className="text-xl -pb-2">Description</p>
          <input
            type="text"
            placeholder="Enter Description"
            value={description}
            onChange={(e) => {
              setDescription(e.target.value + " Uploded via YTLayer v1");
              console.log(description);
            }}
            className="px-4 py-3 rounded-md outline-none focus:ring-1 ring-white min-h-40 w-full"
          />
          <div className="w-full grid grid-cols-2 gap-x-4 p-4">
            <div>
              {data?.[0]?.id && (
                <div className="flex flex-col gap-y-4">
                  <p className="text-xl">Your Video</p>
                  <iframe
                    src={`https://youtube.com/embed/${data?.[0]?.id}`}
                    className="w-full aspect-video border-2 rounded-md"
                  ></iframe>
                </div>
              )}
            </div>
            <div className={cn("flex flex-col gap-y-4", !data && "col-span-2")}>
              {media ? (
                <p className="text-xl">Preview of your Video</p>
              ) : (
                <p className="text-xl -pb-2">Choose your Video File</p>
              )}
              <div className="w-full aspect-video  border-2 flex items-center justify-center relative rounded-md">
                {media ? (
                  <video
                    src={mediaPreview as string}
                    className="absolute w-full h-full"
                    controls
                  ></video>
                ) : (
                  <>
                    <input
                      type="file"
                      accept="video/*"
                      onChange={(e) => {
                        const files = e.target.files;
                        if (files && files.length > 0) {
                          console.log(files[0]);
                          setMedia(files[0]);
                          setMediaPreview(URL.createObjectURL(files[0]));
                        }
                      }}
                      id="VideoFile"
                      className="hidden"
                    />
                    <label
                      htmlFor="VideoFile"
                      className="text-xl underline text-indigo-400"
                    >
                      Choose Your Video File
                    </label>
                  </>
                )}
              </div>
            </div>
          </div>
          <button
            onClick={uploadVideo}
            disabled={isLoading}
            className="px-4 py-2 ml-auto rounded-md bg-indigo-400 text-white shadow-md flex items-center justify-center text-xl font-medium"
          >
            {isLoading ? "Uploading..." : "Upload Video to YouTube"}
          </button>
        </div>
      </>
    </>
  );
};

export default UploadVideo;
