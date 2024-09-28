"use client";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { ReactNode, useEffect, useState } from "react";
import { signIn } from "next-auth/react";
import toast from "react-hot-toast";
import { useSearchParams } from "next/navigation";

export type TLogin = {
  email: string;
  password: string;
};

const LoginPage = () => {
  const { register, handleSubmit, reset, formState } = useForm<TLogin>();
  const { errors } = formState;
  const [showPassword, setShowPassword] = useState(false);
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect");

  const onSubmit = async (data: TLogin) => {
    console.log(data);

    //  try {
    //    const res = await loginUser(data);

    //    if (res.accessToken) {
    //      alert(res.message);
    //      localStorage.setItem("accessToken", res.accessToken);
    //      router.push("/login");
    //    }
    //  } catch (err: any) {
    //    console.error(err.message);
    //    throw new Error(err.message);
    //  }
  };

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
          <div className="m-auto  py-12">
            <div className="rounded-3xl border bg-gray-50 -mx-6 sm:-mx-10 p-8 sm:p-10">
              <div className="space-y-4 mb-6">
                <Link href="/">
                  <h1 className="text-4xl text-center">Logo</h1>
                </Link>
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

              <form
                onSubmit={handleSubmit(onSubmit)}
                className="mt-7 space-y-8"
              >
                <div>
                  <div className="relative before:absolute before:bottom-0 before:h-0.5 before:left-0 before:origin-right focus-within:before:origin-left before:right-0 before:scale-x-0 before:m-auto before:bg-sky-700  focus-within:before:!scale-x-100 focus-within:invalid:before:bg-red-400 before:transition before:duration-300">
                    <input
                      type="email"
                      {...register("email", {
                        required: {
                          value: true,
                          message: "Email is required",
                        },
                        pattern: {
                          value:
                            /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                          message: "Invalid Email Format",
                        },
                      })}
                      className="w-full bg-transparent pb-3  border-b border-gray-300 outline-none invalid:border-red-400 transition text-gray-800"
                      placeholder="Enter your email"
                    />
                  </div>
                  <p className="mt-2 text-sm text-primary font-medium">
                    {errors?.email?.message as ReactNode}
                  </p>
                </div>

                <div className="flex flex-col items-end">
                  <div className="w-full relative before:absolute before:bottom-0 before:h-0.5 before:left-0 before:origin-right focus-within:before:origin-left before:right-0 before:scale-x-0 before:m-auto before:bg-sky-400 dark:before:bg-sky-800 focus-within:before:!scale-x-100 focus-within:invalid:before:bg-red-400 before:transition before:duration-300">
                    <input
                      type={showPassword ? "text" : "password"}
                      {...register("password", {
                        required: {
                          value: true,
                          message: "Password is required",
                        },
                      })}
                      id=""
                      className="w-full bg-transparent pb-3  border-b border-gray-300 outline-none transition text-gray-800"
                      placeholder="Enter your password"
                      required
                    />
                    <span
                      className="absolute right-3 top-2 text-gray-800"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <FaEyeSlash></FaEyeSlash>
                      ) : (
                        <FaEye></FaEye>
                      )}
                    </span>
                  </div>
                  <p className="mt-2 text-sm text-primary font-medium">
                    {errors?.password?.message as ReactNode}
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
                    Login
                  </span>
                  Login
                </button>
              </form>
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
