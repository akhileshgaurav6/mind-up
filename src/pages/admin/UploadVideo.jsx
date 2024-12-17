import { FileInput } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { PiSpinnerBold } from "react-icons/pi";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { getAllCourses } from "../../services/course.service";
import { createVideoMetaData, uploadVideo } from "../../services/video.service";

const UploadVideo = () => {
  const [loader, setLoader] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [courses, setCourses] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoader(true);
        const response = await getAllCourses();
        setCourses(response?.content || []);
      } catch (error) {
        toast.error("Failed to fetch courses.");
        console.error("Failed to fetch courses:", error);
      } finally {
        setLoader(false);
      }
    };
    fetchCourses();
  }, []);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      setLoader(true);
      const videoMetaData = await createVideoMetaData({
        title: data.title,
        desc: data.desc,
        course: {
          id: data.courseId,
        },
      });

      const videoFile = data.file[0];
      if (!videoFile) {
        throw new Error("Video file is missing.");
      }

      await uploadVideo(videoMetaData.id, videoFile, data.courseId, (progressEvent) => {
        const total = progressEvent.total || 0;
        const percentage = Math.round((progressEvent.loaded * 100) / total);
        setUploadProgress(percentage);
      });

      toast.success("Video metadata saved successfully.");
      toast.success("Video uploaded successfully.");
      navigate("/admin/all-courses");
    } catch (error) {
      console.error("Error in video upload process:", error);
      toast.error(
        error?.message || "Error in uploading video. Check video details."
      );
    } finally {
      setLoader(false);
      setUploadProgress(0);
      reset();
    }
  };

  return (
    <div className="min-h-screen p-6 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <Toaster position="top-right" reverseOrder={false} />
      <div className="max-w-4xl mx-auto bg-gray-100 dark:bg-gray-700 rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">Upload Video</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label htmlFor="title" className="block text-sm font-medium mb-2">
              Video Title
            </label>
            <input
              type="text"
              id="title"
              {...register("title", { required: "Video title is required" })}
              placeholder="Enter video title"
              className="w-full px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-300 border rounded-md"
            />
            {errors.title && (
              <p className="text-red-500 text-sm mt-1">
                {errors.title.message}
              </p>
            )}
          </div>

          <div className="mb-4">
            <label htmlFor="desc" className="block text-sm font-medium mb-2">
              Video Description
            </label>
            <textarea
              id="desc"
              {...register("desc", { required: "Video description is required" })}
              placeholder="Enter video description"
              rows="4"
              className="w-full px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-300 border rounded-md"
            ></textarea>
            {errors.desc && (
              <p className="text-red-500 text-sm mt-1">{errors.desc.message}</p>
            )}
          </div>

          <div className="mb-4">
            <label htmlFor="course" className="block text-sm font-medium mb-2">
              Select Course
            </label>
            <select
              id="course"
              {...register("courseId", { required: "Please select a course" })}
              className="w-full px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-300 border rounded-md"
            >
              <option value="">Select a course</option>
              {courses.map((course) => (
                <option key={course.id} value={course.id}>
                  {course.title}
                </option>
              ))}
            </select>
            {errors.courseId && (
              <p className="text-red-500 text-sm mt-1">
                {errors.courseId.message}
              </p>
            )}
          </div>

          <div className="mb-4">
            <label htmlFor="file" className="block text-sm font-medium mb-2">
              Upload Video File
            </label>
            <FileInput
              type="file"
              accept="video/*"
              {...register("file", { required: "Video file is required" })}
              id="file"
              className="w-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-300 border rounded-md"
            />
            {errors.file && (
              <p className="text-red-500 text-sm mt-1">{errors.file.message}</p>
            )}
          </div>

          {uploadProgress > 0 && (
            <div className="mb-4">
              <div className="h-4 w-full bg-gray-300 rounded-md overflow-hidden">
                <div
                  className="h-full bg-blue-600"
                  style={{ width: `${uploadProgress}%` }}
                ></div>
              </div>
              <p className="text-sm text-gray-600 mt-1">
                Upload Progress: {uploadProgress}%
              </p>
            </div>
          )}

          <div className="grid grid-cols-2 gap-4">
            <button
              className="w-full bg-primary text-white font-bold py-2 px-4 rounded flex items-center justify-center"
              type="submit"
              disabled={loader}
            >
              {loader && <PiSpinnerBold className="w-5 h-5 animate-spin mr-2" />}
              <span>{loader ? "Processing.." : "Upload Video"}</span>
            </button>
            <button
              className="w-full bg-gray-400 text-white font-bold py-2 px-4 rounded"
              type="reset"
            >
              Reset
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UploadVideo;
