import React from "react";

const WritersModal = ({ profiles = [], removeWriter }) => {
  return (
    <>
      <dialog id="writers_modal" className="modal">
        <form method="dialog" className="modal-box ">
          <h3 className="font-bold text-lg">Writers</h3>
          {!profiles.length ? (
            <p className="text-error"> No writers Selected</p>
          ) : (
            <section className="flex items-center space-x-5 justify-center">
              {profiles?.map((p, idx) => {
                const { id, name, avatar } = p;
                return (
                  <div key={id} className="flex flex-col gap-2 mb-4">
                    <img
                      className="w-32 h-48 object-fill rounded-md shadow-sm "
                      src={avatar}
                      alt={name}
                    />
                    <p className="text-lg font-semibold">{name}</p>
                    <button
                      className="btn btn-xs btn-outline btn-error"
                      onClick={() => removeWriter(id)}
                    >
                      Remove
                    </button>
                  </div>
                );
              })}
            </section>
          )}

          <div className="modal-action">
            {/* if there is a button, it will close the modal */}
            <button className="btn">Close</button>
          </div>
        </form>
      </dialog>
    </>
  );
};

export default WritersModal;
