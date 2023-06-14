import React, { useState } from "react";
import { FileUploader } from "react-drag-drop-files";
import { FaUpload } from "react-icons/fa";
import { useNotificationContext } from "../../../context/NotificationContext";
import ActorForm from "../ActorForm";

const imageFileTypes = ["JPG", "JPEG", "PNG", "GIF"];

const ActorModal = () => {
  const { updateNotification } = useNotificationContext();
  const [file, setFile] = useState(null);
  const [avatarSelected, setAvatarSelected] = useState(false);
  const [isLoading, setIsloading] = useState(false);

  const handleSubmit = async (actorInfos) => {
    console.log(actorInfos);
  };

  return (
    <>
      <dialog id="actor_modal" className="modal">
        {/* //! later make this form tag  */}
        <div method="dialog" className="modal-box border w-11/12 max-w-2xl">
          <form method="dialog" className="modal-backdrop">
            <button className="btn btn-sm  btn-circle  absolute right-2 top-2">X</button>
          </form>

          <ActorForm title={"Create New Actor"} btnText={"Create"} onSubmit={handleSubmit} />
        </div>
      </dialog>
    </>
  );
};

export default ActorModal;
