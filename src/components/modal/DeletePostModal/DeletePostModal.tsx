import DeletePostModalBody from "./DeletePostModalBody";

export const DeletePostModal = ({
  handleDeletePost,
  openDeleteModal,
  setOpenDeleteModal,
}: any) => {
  const handleDelete = () => {
    handleDeletePost();
    setOpenDeleteModal(false);
  };

  return (
    <div className="mx-auto flex w-72 items-center justify-center">
      {openDeleteModal && (
        <div
          onClick={() => setOpenDeleteModal(false)}
          className={`fixed z-[100] flex items-center justify-center ${
            openDeleteModal ? "opacity-1 visible" : "invisible opacity-0"
          } inset-0 bg-black/20 backdrop-blur-sm duration-100`}
        >
          <DeletePostModalBody
            onDelete={handleDelete}
            onCancel={() => setOpenDeleteModal(false)}
          />
        </div>
      )}
    </div>
  );
};
