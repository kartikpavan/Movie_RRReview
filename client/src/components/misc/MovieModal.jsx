import React, { useState } from "react";
import { useNotificationContext } from "../../context/notificationContext";
import { uploadMovieTrailer } from "../../api/movie";
import { FileUploader } from "react-drag-drop-files";
import { FaUpload } from "react-icons/fa";
import { MdOutlineCloudDone } from "react-icons/md";
const videoFileTypes = ["mp4", "avi"];

const MovieModal = () => {
  const { updateNotification } = useNotificationContext();
  const [file, setFile] = useState(null);
  const [videoSelected, setVideoSelected] = useState(false);

  const handleChange = async (file) => {
    setFile(file);
    const formData = new FormData();
    formData.append("trailer", file);
    const res = await uploadMovieTrailer(formData);
    console.log(res);
    setVideoSelected(true);
  };
  // unsopported file type error
  const handleError = (err) => {
    updateNotification("error", err);
  };
  console.log(file);
  return (
    <>
      <dialog id="movie_modal" className="modal">
        <form method="dialog" className="modal-box">
          <h3 className="font-bold text-lg">Add trailer</h3>
          {/* Progress bar */}
          {file && !videoSelected && (
            <>
              <progress className="progress w-full"></progress>
            </>
          )}
          {/* Text to display after successfull upload */}
          {videoSelected && (
            <p className="flex items-center gap-2 p-2 text-sm font-semibold text-success rounded-lg">
              <MdOutlineCloudDone size={20} className="text-green-400" />
              Movie uploaded Successfully
            </p>
          )}

          {!videoSelected && (
            <>
              <FileUploader
                multiple={false}
                handleChange={handleChange}
                onTypeError={handleError}
                name="file"
                types={videoFileTypes}
              >
                <div className="full h-32 border-4 border-dotted border-gray-500 cursor-pointer flex items-center justify-center">
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

          <div className="modal-action">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn">Close</button>
          </div>
        </form>
      </dialog>
    </>
  );
};

export default MovieModal;
