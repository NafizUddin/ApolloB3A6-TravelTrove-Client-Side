"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import logo from "@/src/assets/logo.png";
import { Input } from "@nextui-org/input";
import { useState } from "react";
import { EyeSlashFilledIcon } from "@/src/components/ui/elements/EyeSlashFilledIcon";
import { EyeFilledIcon } from "@/src/components/ui/elements/EyeFilledIcon";
import { ImSpinner6 } from "react-icons/im";
import { useResetPassword } from "@/src/hooks/auth.hook";
import toast from "react-hot-toast";

const ResetPassword = () => {
  const searchParams = useSearchParams();
  const email = searchParams.get("email")!;
  const resetToken = searchParams.get("token")!;
  const [value, setValue] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);
  const router = useRouter();

  const handleSuccess = (data: any) => {
    toast.dismiss();

    if (data.success) {
      toast.success("Password reset successful!");
      router.push("/login");
    } else {
      toast.error(data.message || "Login failed");
    }
  };

  const { mutate: handleResetPassword, isLoading } =
    useResetPassword(handleSuccess);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    toast.loading("Resetting Password...");

    handleResetPassword({ email, newPassword: value, token: resetToken });
  };

  return (
    <section className="bg-gray-50">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full p-6 bg-white rounded-lg shadow md:mt-0 sm:max-w-md sm:p-8">
          <div className="flex justify-center items-center">
            <Link
              href={"/"}
              className="flex items-center mb-6 text-2xl font-semibold text-gray-900"
            >
              <Image
                className=""
                src={logo}
                alt="logo"
                width={200}
                height={200}
              />
            </Link>
          </div>
          <h2 className="mb-1 text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
            Change Password
          </h2>
          <form
            onSubmit={handleSubmit}
            className="mt-4 space-y-4 lg:mt-5 md:space-y-5"
          >
            <div>
              <Input
                value={email as string}
                type="email"
                placeholder="Enter your email..."
                variant="bordered"
                errorMessage="Please enter a valid email"
                size="lg"
                isDisabled
                className="border-2"
              />
            </div>
            <div>
              <Input
                label="Password"
                variant="bordered"
                placeholder="Enter your new password"
                onValueChange={setValue}
                endContent={
                  <button
                    className="focus:outline-none"
                    type="button"
                    onClick={toggleVisibility}
                    aria-label="toggle password visibility"
                  >
                    {isVisible ? (
                      <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                    ) : (
                      <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                    )}
                  </button>
                }
                type={isVisible ? "text" : "password"}
              />
            </div>

            <button
              type="submit"
              className="group relative z-10 h-11 w-full overflow-hidden bg-primary text-white rounded-full text-center font-semibold text-lg"
            >
              <span className="absolute -inset-24 origin-left rotate-12 scale-x-0 transform bg-white transition-transform duration-700 group-hover:scale-x-100 group-hover:duration-300"></span>
              <span className="absolute -inset-24 origin-left rotate-12 scale-x-0 transform bg-sky-700 transition-transform duration-500 group-hover:scale-x-100 group-hover:duration-700"></span>
              <span className="absolute -inset-24 origin-left rotate-12 scale-x-0 transform bg-sky-900 transition-transform duration-300 group-hover:scale-x-50 group-hover:duration-500"></span>
              <span className="absolute z-10 text-center text-white opacity-0 duration-100 ease-out group-hover:opacity-100 group-hover:duration-700">
                {isLoading ? "" : "Reset Password"}
              </span>
              {isLoading ? (
                <ImSpinner6 className="animate-spin m-auto text-xl" />
              ) : (
                "Reset Password"
              )}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ResetPassword;
