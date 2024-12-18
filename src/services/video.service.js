import { privateAxios } from "../config/axios.config"


// export const createVideoMetaData = async (videoData) => {
//     const response = await privateAxios.post("/videos", videoData);
//     return response.data;
// };

// export const uploadVideo = async (videoId,videoFile,courseId,onUploadProgress) => {

//     const formData = new FormData();

//     formData.append("videoId", videoId);
//     formData.append("courseId", courseId);
//     formData.append("videoFile", videoFile);

//     const resp = await privateAxios.post("/videos/upload", formData);
//     return resp.data
// }


export const createVideoMetaData = async (videoData) => {
    const response = await privateAxios.post("/videos", videoData);
    return response.data;
  };
  
  export const uploadVideo = async (
    videoId,
    videoFile,
    courseId,
    onUploadProgress
  ) => {
    const formData = new FormData();
    formData.append("videoId", videoId);
    formData.append("courseId", courseId);
    formData.append("videoFile", videoFile);
    const resp = await privateAxios.post("/videos/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      onUploadProgress, // Progress callback
    });
    return resp.data;
  };

