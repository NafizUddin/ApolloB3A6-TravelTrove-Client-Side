import { useState } from "react";
import ModalBody from "./ModalBody"; // Assuming ModalBody is in the same folder

export const DeleteModal = ({
  handleDeleteComment,
  openModal,
  setOpenModal,
}: any) => {
  const handleDelete = () => {
    handleDeleteComment();
    setOpenModal(false);
  };

  return (
    <div className="mx-auto flex w-72 items-center justify-center">
      {/* <button
        onClick={() => setOpenModal(true)}
        className="rounded-md bg-indigo-600 px-4 py-[6px] text-white"
      >
        Attention!
      </button> */}
      {openModal && (
        <div
          onClick={() => setOpenModal(false)}
          className={`fixed z-[100] flex items-center justify-center ${
            openModal ? "opacity-1 visible" : "invisible opacity-0"
          } inset-0 bg-black/20 backdrop-blur-sm duration-100`}
        >
          <ModalBody
            onDelete={handleDelete}
            onCancel={() => setOpenModal(false)}
          />
        </div>
      )}
    </div>
  );
};
