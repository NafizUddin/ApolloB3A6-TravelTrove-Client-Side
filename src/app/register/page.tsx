"use client";
import Link from "next/link";
import {
  FieldValues,
  FormProvider,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import { ReactNode, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useRouter, useSearchParams } from "next/navigation";
import TRForm from "@/src/components/form/TRForm";
import { zodResolver } from "@hookform/resolvers/zod";
import TRInput from "@/src/components/form/TRInput";
import Image from "next/image";
import logo from "@/src/assets/logo.jpg";
import { useUser } from "@/src/context/user.provider";
import { ImSpinner6 } from "react-icons/im";
import { useUserLogin, useUserRegistration } from "@/src/hooks/auth.hook";
import TRFileInput from "@/src/components/form/TRFileInput";
import registerValidationSchema from "@/src/schemas/register.schema";

const RegisterPage = () => {
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect");
  const router = useRouter();
  const methods = useForm();
  const {
    handleSubmit,
    setValue,
    register,
    formState: { errors },
  } = methods;
  const { setIsLoading: userLoading } = useUser();
  const {
    mutate: handleUserLogin,
    isLoading,
    isSuccess,
  } = useUserRegistration();

  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [fileName, setFileName] = useState<string>("");

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      setFileName(file.name); // Set the file name
      setValue("image", file); // Set image file to react-hook-form
    }
  };

  const clearFileSelection = () => {
    setSelectedImage(null);
    setFileName("");
    setValue("image", null);
  };

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    console.log(data);
  };

  return (
    <div>
      <div className="m-auto xl:container px-12 sm:px-0 mx-auto">
        <div className="mx-auto h-full sm:max-w-[350px]">
          <div className="m-auto py-8">
            <div className="rounded-3xl border border-primary-400 bg-gray-50 -mx-6 sm:-mx-10 p-8 shadow-2xl">
              <div className="space-y-4 mb-6">
                <div className="flex justify-center items-center">
                  <Link href="/">
                    <Image
                      src={logo}
                      alt="logo"
                      height={200}
                      width={200}
                      className=""
                    />
                  </Link>
                </div>
              </div>
              <h3 className="text-2xl font-semibold text-gray-700 text-center">
                Create your account
              </h3>

              {/* <FormProvider {...methods}>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="py-3">
                    <TRInput name="name" label="Full Name" type="text" />
                  </div>
                  <div className="py-3">
                    <TRInput name="email" label="Email" type="email" />
                  </div>
                  <div className="py-3">
                    <TRInput name="password" label="Password" type="password" />
                  </div>

                  <div className="py-3">
                    <label
                      className="flex h-14 w-full cursor-pointer items-center justify-center rounded-xl border-2 border-primary-400 text-default-800 shadow-sm transition-all duration-100 hover:border-primary-600"
                      htmlFor="image"
                    >
                      Upload image
                    </label>
                    <input
                      accept="image/*"
                      className="hidden"
                      id="image"
                      type="file"
                      onChange={handleImageChange}
                    />
                    {fileName && (
                      <div className="mt-2 flex items-center text-sm text-gray-600 justify-between">
                        <span
                          className="font-medium mr-2 truncate w-60"
                          style={{
                            overflow: "hidden",
                            whiteSpace: "nowrap",
                            textOverflow: "ellipsis",
                          }}
                        >
                          Selected file: {fileName}
                        </span>
                        <button
                          type="button"
                          className="text-red-500 hover:text-red-700 font-medium"
                          onClick={clearFileSelection}
                        >
                          Clear
                        </button>
                      </div>
                    )}

                    <p className="text-sm text-red-600 font-medium text-center mt-2">
                      {errors?.image?.message as ReactNode}
                    </p>
                  </div>

                  <button
                    type="submit"
                    className="group relative z-10 h-11 w-full overflow-hidden bg-primary text-white rounded-full text-center font-semibold text-lg"
                  >
                    <span className="absolute -inset-24 origin-left rotate-12 scale-x-0 transform bg-white transition-transform duration-700 group-hover:scale-x-100 group-hover:duration-300"></span>
                    <span className="absolute -inset-24 origin-left rotate-12 scale-x-0 transform bg-sky-700 transition-transform duration-500 group-hover:scale-x-100 group-hover:duration-700"></span>
                    <span className="absolute -inset-24 origin-left rotate-12 scale-x-0 transform bg-sky-900 transition-transform duration-300 group-hover:scale-x-50 group-hover:duration-500"></span>
                    <span className="absolute z-10 text-center text-white opacity-0 duration-100 ease-out group-hover:opacity-100 group-hover:duration-700">
                      {isLoading ? "" : "Sign Up"}
                    </span>
                    {isLoading ? (
                      <ImSpinner6 className="animate-spin m-auto text-xl" />
                    ) : (
                      "Sign Up"
                    )}
                  </button>
                </form>
              </FormProvider> */}

              <TRForm
                // defaultValues={{
                //   email: "admin@gmail.com",
                //   password: "admin123",
                // }}
                onSubmit={onSubmit}
                resolver={zodResolver(registerValidationSchema)}
              >
                <div className="py-3">
                  <TRInput name="name" label="Full Name" type="text" />
                </div>
                <div className="py-3">
                  <TRInput name="email" label="Email" type="email" />
                </div>
                <div className="py-3">
                  <TRInput name="password" label="Password" type="password" />
                </div>

                <div className="py-3">
                  <TRFileInput name="image" label="Upload Image" />{" "}
                </div>

                <button
                  type="submit"
                  className="group relative z-10 h-11 w-full overflow-hidden bg-primary text-white rounded-full text-center font-semibold text-lg"
                >
                  <span className="absolute -inset-24 origin-left rotate-12 scale-x-0 transform bg-white transition-transform duration-700 group-hover:scale-x-100 group-hover:duration-300"></span>
                  <span className="absolute -inset-24 origin-left rotate-12 scale-x-0 transform bg-sky-700 transition-transform duration-500 group-hover:scale-x-100 group-hover:duration-700"></span>
                  <span className="absolute -inset-24 origin-left rotate-12 scale-x-0 transform bg-sky-900 transition-transform duration-300 group-hover:scale-x-50 group-hover:duration-500"></span>
                  <span className="absolute z-10 text-center text-white opacity-0 duration-100 ease-out group-hover:opacity-100 group-hover:duration-700">
                    {isLoading ? "" : "LogIn"}
                  </span>
                  {isLoading ? (
                    <ImSpinner6 className="animate-spin m-auto text-xl" />
                  ) : (
                    "LogIn"
                  )}
                </button>
              </TRForm>

              <div className="w-full rounded-lg mt-6 xl:p-0">
                <h1 className="text-center">
                  Already have an account?{" "}
                  <Link href="/login">
                    <span className="hover:underline text-primary font-medium">
                      Login Now!
                    </span>
                  </Link>
                </h1>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
