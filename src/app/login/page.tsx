"use client";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { signIn } from "next-auth/react";
import toast from "react-hot-toast";
import { useRouter, useSearchParams } from "next/navigation";
import TRForm from "@/src/components/form/TRForm";
import { zodResolver } from "@hookform/resolvers/zod";
import loginValidationSchema from "@/src/schemas/login.schema";
import TRInput from "@/src/components/form/TRInput";
import Image from "next/image";
import logo from "@/src/assets/logo.png";
import { useUser } from "@/src/context/user.provider";
import { useUserLogin } from "@/src/hooks/auth.hook";
import { ImSpinner6 } from "react-icons/im";

export type TLogin = {
  email: string;
  password: string;
};

const LoginPage = () => {
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect");
  const router = useRouter();
  const { setIsLoading: userLoading } = useUser();
  const { mutate: handleUserLogin, isLoading, isSuccess } = useUserLogin();

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    handleUserLogin(data);
    userLoading(true);
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

  const handleGoogleLogin = async () => {
    try {
      await signIn("google", {
        callbackUrl: redirect ? redirect : "/",
      });

      toast.success("Logged in successfully!", {
        duration: 4000,
      });
    } catch (error: any) {
      toast.error(error.message, {
        duration: 4000,
      });
    }
  };

  const handleGithubLogin = async () => {
    try {
      await signIn("github", {
        callbackUrl: redirect ? redirect : "/",
      });

      toast.success("Logged in successfully!", {
        duration: 4000,
      });
    } catch (error: any) {
      toast.error(error.message, {
        duration: 4000,
      });
    }
  };

  return (
    <div>
      <div className="m-auto xl:container px-12 sm:px-0 mx-auto">
        <div className="mx-auto h-full sm:w-max">
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
                Login to your account
              </h3>
              <div className="mt-8 flex flex-wrap sm:grid gap-6 grid-cols-2">
                <button
                  onClick={handleGoogleLogin}
                  className="w-full h-11 rounded-full border border-gray-300/75 bg-white px-6 transition active:bg-gray-50"
                >
                  <div className="w-max mx-auto flex items-center justify-center space-x-4">
                    <FcGoogle className="text-xl" />
                    <span className="block w-max text-sm font-semibold tracking-wide text-cyan-700">
                      With Google
                    </span>
                  </div>
                </button>
                <button
                  onClick={handleGithubLogin}
                  className="w-full h-11 rounded-full bg-gray-900 px-6 transition hover:bg-gray-800 focus:bg-gray-700 active:bg-gray-600"
                >
                  <div className="w-max mx-auto flex items-center justify-center space-x-4 text-white">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      className="w-5"
                      viewBox="0 0 16 16"
                    >
                      <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
                    </svg>
                    <span className="block w-max text-sm font-semibold tracking-wide text-white">
                      With Github
                    </span>
                  </div>
                </button>
              </div>

              <TRForm
                // defaultValues={{
                //   email: "admin@gmail.com",
                //   password: "admin123",
                // }}
                defaultValues={{
                  email: "nafizuddin.usa@gmail.com",
                  password: "nafiz123",
                }}
                onSubmit={onSubmit}
                resolver={zodResolver(loginValidationSchema)}
              >
                <div className="py-3">
                  <TRInput name="email" label="Email" type="email" />
                </div>
                <div className="py-3">
                  <TRInput name="password" label="Password" type="password" />
                </div>

                <div className="flex items-center justify-end">
                  <button type="reset" className="-mr-3 w-max p-3">
                    <span className="text-sm tracking-wide text-primary-600 ">
                      Forgot password ?
                    </span>
                  </button>
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
                  Don&apos;t have an account?{" "}
                  <Link href="/register">
                    <span className="hover:underline text-primary font-medium">
                      Create free account
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

export default LoginPage;
