"use client";

import { useSearchParams } from "next/navigation";

const ResetPassword = () => {
  const searchParams = useSearchParams();
  const email = searchParams.get("email");
  const resetToken = searchParams.get("token");

  return (
    <div>
      <h1>Hello, ResetPassword </h1>
    </div>
  );
};

export default ResetPassword;
