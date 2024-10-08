"use client";

import { protectedRoutes } from "@/src/constant";
import { useUser } from "@/src/context/user.provider";
import { logout } from "@/src/services/AuthServices";
import { IUser } from "@/src/types";
import { Avatar } from "@nextui-org/avatar";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/dropdown";
import { LayoutDashboard, LogOut, User } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import toast from "react-hot-toast";

interface IProps {
  user: IUser;
}

export default function NavbarUserDropdown({ user }: IProps) {
  const router = useRouter();
  const { setUser, setIsLoading: userLoading } = useUser();
  const pathname = usePathname();

  const handleLogout = () => {
    logout();
    setUser(null);
    userLoading(true);

    if (protectedRoutes.some((route) => pathname.match(route))) {
      router.push("/");
    }

    toast.success("Logged out successfully");
  };

  const handleNavigation = (pathname: string) => {
    router.push(pathname);
  };

  return (
    <div className="flex items-center gap-4">
      <Dropdown placement="bottom-end">
        <DropdownTrigger>
          <Avatar
            isBordered
            as="button"
            className="transition-transform"
            src={user.profilePhoto}
          />
        </DropdownTrigger>
        <DropdownMenu aria-label="Profile Actions" variant="flat">
          <DropdownItem key="profile" className="h-14 gap-2">
            <p className="font-semibold">Signed in as</p>
            <p className="font-semibold">{user.email}</p>
          </DropdownItem>
          <DropdownItem onClick={() => handleNavigation("/profile")}>
            <span className="flex items-center gap-2">
              <span>
                <User size={16} />
              </span>
              <span>My Profile</span>
            </span>
          </DropdownItem>
          <DropdownItem
            onClick={() =>
              handleNavigation(
                user?.role === "USER" ? "/user-dashboard" : "/admin-dashboard"
              )
            }
          >
            <span className="flex items-center gap-2">
              <span>
                <LayoutDashboard size={16} />
              </span>
              <span>Dashboard</span>
            </span>
          </DropdownItem>
          <DropdownItem onClick={handleLogout} key="logout" color="danger">
            <span className="flex items-center gap-2">
              <span>
                <LogOut size={16} />
              </span>
              <span>Logout</span>
            </span>
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  );
}
