"use client";

import { IUpdateUser, IUser } from "@/src/types";
import TRForm from "../../form/TRForm";
import toast from "react-hot-toast";
import { FieldValues, SubmitHandler } from "react-hook-form";
import TRInput from "../../form/TRInput";
import TRFileInput from "../../form/TRFileInput";
import envConfig from "@/src/config/envConfig";
import axios from "axios";
import { useUpdateUser } from "@/src/hooks/user.hook";

interface IModalBodyProps {
  setOpenModal: any;
  user: IUser;
}

const EditProfileBody = ({ setOpenModal, user }: IModalBodyProps) => {
  const { mutate: handleUpdateUser } = useUpdateUser();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const hasImage = !!data.image;
    const hasNameChanged = data.name !== user.name;
    const hasEmailChanged = data.email !== user.email;

    if (!hasImage && !hasNameChanged && !hasEmailChanged) {
      setOpenModal(false);
      return;
    }

    toast.loading("Updating Profile...");

    let imageUrl = user?.profilePhoto;

    if (hasImage) {
      const formData = new FormData();
      formData.append("file", data.image);
      formData.append(
        "upload_preset",
        envConfig.cloudinary_upload_preset as string
      );

      try {
        const response = await axios.post(
          envConfig.cloudinary_url as string,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        imageUrl = response.data.secure_url;
      } catch (error: any) {
        console.error(error.message);
        toast.error("Failed to upload image");
        return;
      }
    }

    try {
      const userData: IUpdateUser = {
        name: data.name ? data.name : user.name,
        email: data.email ? data.email : user.email,
        profilePhoto: imageUrl,
      };

      toast.dismiss();

      handleUpdateUser({ userData, id: user._id });
      toast.success("Profile updated successfully!");
      setOpenModal(false);
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className="absolute w-96 mx-auto rounded-lg bg-white p-6 text-center drop-shadow-2xl  opacity-1 translate-y-0 duration-300"
    >
      <div className="flex flex-col items-center justify-center space-y-4">
        <h1 className="text-center text-3xl font-bold">Edit Profile</h1>

        <div className="w-full">
          <TRForm
            defaultValues={{
              name: user?.name,
              email: user.email,
            }}
            onSubmit={onSubmit}
          >
            <div className="py-3">
              <TRInput name="name" label="Full Name" type="text" />
            </div>
            <div className="py-3">
              <TRInput name="email" label="Email" type="email" />
            </div>

            <div className="py-3">
              <TRFileInput name="image" label="Upload Image" />{" "}
            </div>

            <div className="flex gap-5 justify-center items-center">
              <button
                type="submit"
                className="rounded-md bg-green-600 px-6 py-2 text-sm text-white hover:bg-green-700"
              >
                Submit
              </button>
              <button
                onClick={() => setOpenModal(false)}
                className="rounded-md border border-rose-600 px-6 py-2 text-sm text-rose-600 duration-150 hover:bg-rose-600 hover:text-white"
              >
                Cancel
              </button>
            </div>
          </TRForm>
        </div>
      </div>
    </div>
  );
};

export default EditProfileBody;
