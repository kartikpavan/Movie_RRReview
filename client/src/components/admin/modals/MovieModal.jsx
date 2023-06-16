import React, { useState } from "react";
import { uploadMovie, uploadMovieTrailer } from "../../../api/movie";
import { FileUploader } from "react-drag-drop-files";
import { FaUpload } from "react-icons/fa";
import { MdOutlineCloudDone } from "react-icons/md";
import MovieForm from "../MovieForm";
import { useNotificationContext } from "../../../context/NotificationContext";
const videoFileTypes = ["mp4", "avi", "mov"];

const MovieModal = () => {
  const { updateNotification } = useNotificationContext();
  const [file, setFile] = useState(null);
  const [videoSelected, setVideoSelected] = useState(false);
  const [isLoading, setIsloading] = useState(false);
  const [videoInfo, setVideoinfo] = useState({});
  const [isMovieUploading, setIsMovieUploading] = useState(false);

  //   Upload Trailer Function
  const handleUploadTrailer = async (formData) => {
    setIsloading(true);
    setFile(file);
    const { error, url, public_id } = await uploadMovieTrailer(formData);
    if (error) updateNotification("error", error);
    setVideoinfo({ url, public_id });
    setVideoSelected(true);
    setIsloading(false);
  };
  // Upload Movie Info
  const handleMovieSubmit = async (formData, setMovieInfo, defaultMovieInfo) => {
    setIsMovieUploading(true);
    if (!videoInfo.url || !videoInfo.public_id) {
      return updateNotification("error", "trailer is missing");
    }
    formData.append("trailer", JSON.stringify(videoInfo));
    const { error, data } = await uploadMovie(formData);
    if (error) return updateNotification("error", error);

    updateNotification("success", "Movie Uploaded Successfully");
    setIsMovieUploading(false);
    setMovieInfo(defaultMovieInfo);
    window.movie_modal.close(); // closing movie upload modal
  };

  const handleChange = (file) => {
    const formData = new FormData();
    formData.append("trailer", file);
    handleUploadTrailer(formData); // uploading trailer in the background
  };
  // unsopported file type error
  const handleError = (err) => {
    updateNotification("error", err);
  };

  return (
    <>
      <dialog id="movie_modal" className="modal">
        <div method="dialog" className="modal-box w-11/12 max-w-4xl  overflow-auto">
          <form method="dialog" className="modal-backdrop">
            <button className="btn btn-sm btn-circle absolute right-2 top-2">X</button>
          </form>
          {/* Text to display after successfull upload */}
          {videoSelected && (
            <p className="flex items-center justify-center gap-2 p-2 text-sm font-semibold text-success rounded-lg">
              <MdOutlineCloudDone size={20} className="text-green-400" />
              Movie uploaded Successfully
            </p>
          )}
          {isLoading && <progress className="progress w-full progress-primary" />}
          {!videoSelected && !isLoading && (
            <>
              <FileUploader
                multiple={false}
                handleChange={handleChange}
                onTypeError={handleError}
                name="file"
                types={videoFileTypes}
              >
                <div className="full m-3 h-32 border-4 border-dotted border-gray-500 cursor-pointer flex items-center justify-center">
                  <div className="grid place-items-center">
                    <FaUpload className="w-14 h-14 text-neutral" />
                    <p className="font-semibold text-neutral text-lg">Drop Your Files here</p>
                  </div>
                </div>
              </FileUploader>
              <p className="text-gray-400">
                {file ? `File name: ${file?.name}` : "*No files uploaded yet"}
              </p>
            </>
          )}

          {videoSelected && <MovieForm onSubmit={handleMovieSubmit} isLoading={isMovieUploading} />}
        </div>
      </dialog>
    </>
  );
};

export default MovieModal;
