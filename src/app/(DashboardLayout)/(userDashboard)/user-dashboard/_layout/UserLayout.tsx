"use client";

import { ReactNode } from "react";
import { UserSidebar } from "../../../_components/Sidebar/UserSidebar";

const UserLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex">
      <UserSidebar></UserSidebar>
      {children}
    </div>
  );
};

export default UserLayout;
