"use client";

import { ReactNode } from "react";

const UserLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex">
      <h1>User Sidebar</h1>
      {children}
    </div>
  );
};

export default UserLayout;
