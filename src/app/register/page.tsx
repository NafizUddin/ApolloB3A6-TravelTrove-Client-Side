"use client";
import Link from "next/link";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { useRouter, useSearchParams } from "next/navigation";
import TRForm from "@/src/components/form/TRForm";
import { zodResolver } from "@hookform/resolvers/zod";
import TRInput from "@/src/components/form/TRInput";
import Image from "next/image";
import logo from "@/src/assets/logo.png";
import { useUser } from "@/src/context/user.provider";
import { ImSpinner6 } from "react-icons/im";
import { useUserRegistration } from "@/src/hooks/auth.hook";
import TRFileInput from "@/src/components/form/TRFileInput";
import registerValidationSchema from "@/src/schemas/register.schema";
import { useEffect } from "react";
import envConfig from "@/src/config/envConfig";
import axios from "axios";
import toast from "react-hot-toast";

const RegisterPage = () => {
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect");
  const router = useRouter();
  const { setIsLoading: userLoading } = useUser();
  const {
    mutate: handleUserRegister,
    isLoading,
    isSuccess,
  } = useUserRegistration();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    let imageUrl =
      "https://www.pngall.com/wp-content/uploads/5/Profile-PNG-Free-Download.png";

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
        name: data.name,
        email: data.email,
        password: data.password,
        profilePhoto: imageUrl,
      };

      handleUserRegister(userData);
      userLoading(true);
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (!isLoading && isSuccess) {
      if (redirect) {
        router.push(redirect);
      } else {
        router.push("/");
      }
    }
  }, [isLoading, isSuccess]);

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
                  <TRInput
                    name="email"
                    label="Email"
                    type="email"
                    pathname="/register"
                  />
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
                    {isLoading ? "" : "Sign Up"}
                  </span>
                  {isLoading ? (
                    <ImSpinner6 className="animate-spin m-auto text-xl" />
                  ) : (
                    "Sign Up"
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
