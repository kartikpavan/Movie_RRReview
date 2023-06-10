import React, { useState } from "react";
import { useNotificationContext } from "../../context/notificationContext";
import { FileUploader } from "react-drag-drop-files";
import { FaUpload } from "react-icons/fa";

const imageFileTypes = ["JPG", "JPEG", "PNG", "GIF"];

const ActorModal = () => {
  const { updateNotification } = useNotificationContext();
  const [file, setFile] = useState(null);

  const handleChange = (file) => {
    setFile(file);
  };
  // unsopported file type error
  const handleError = (err) => {
    updateNotification("error", err);
  };
  console.log(file);
  return (
    <>
      <dialog id="actor_modal" className="modal">
        <form method="dialog" className="modal-box">
          <h3 className="font-bold text-lg text-neutral">This is Actor Modal!</h3>
          <FileUploader
            multiple={false}
            handleChange={handleChange}
            onTypeError={handleError}
            name="file"
            types={imageFileTypes}
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
          <div className="modal-action">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn">Close</button>
          </div>
        </form>
      </dialog>
    </>
  );
};

export default ActorModal;
