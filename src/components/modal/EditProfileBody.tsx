"use client";

import { useUserRegistration } from "@/src/hooks/auth.hook";
import { IUpdateUser, IUser } from "@/src/types";
import { ImSpinner6 } from "react-icons/im";
import TRForm from "../form/TRForm";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import updateProfileValidationSchema from "@/src/schemas/updateProfile.schema";
import TRInput from "../form/TRInput";
import TRFileInput from "../form/TRFileInput";
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
    if (
      data.name === user.name &&
      data.email === user.email &&
      data.image[0] === undefined
    ) {
      setOpenModal(false);
      return;
    }

    let imageUrl = user?.profilePhoto;

    if (data?.image) {
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
      }
    }
    try {
      const userData = {
        name: data.name ? data.name : user.name,
        email: data.email ? data.email : user.email,
        profilePhoto: imageUrl,
      };

      handleUpdateUser({ userData, id: user._id });
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
            resolver={zodResolver(updateProfileValidationSchema)}
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
                className="rounded-md bg-green-600 px-6 py-2 text-sm text-white"
              >
                Submit
              </button>
              <button
                onClick={() => setOpenModal(false)}
                className="rounded-md border border-gray-600 px-6 py-2 text-sm text-gray-600 hover:bg-gray-600 hover:text-white"
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
