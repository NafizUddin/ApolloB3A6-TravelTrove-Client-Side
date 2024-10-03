import VerifyProfileBody from "./VerifyProfileBody";

const VerifyModal = ({ user, openModal, setOpenModal }: any) => {
  return (
    <div className="mx-auto flex w-72 items-center justify-center">
      {openModal && (
        <div
          onClick={() => setOpenModal(false)}
          className={`fixed z-[100] flex items-center justify-center ${
            openModal ? "opacity-1 visible" : "invisible opacity-0"
          } inset-0 bg-black/20 backdrop-blur-sm duration-100`}
        >
          <VerifyProfileBody setOpenModal={setOpenModal} user={user} />
        </div>
      )}
    </div>
  );
};

export default VerifyModal;
