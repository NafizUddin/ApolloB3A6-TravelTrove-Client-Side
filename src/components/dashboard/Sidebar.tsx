"use client";

import { useEffect, useRef, useState } from "react";
import { Menu } from "lucide-react";
import logo from "@/src/assets/logo.png";
import Link from "next/link";
import Image from "next/image";
import { useUser } from "@/src/context/user.provider";
import { Avatar } from "@nextui-org/avatar";
import { Divider } from "@nextui-org/divider";
import { usePathname, useRouter } from "next/navigation";
import { logout } from "@/src/services/AuthServices";
import { protectedRoutes } from "@/src/constant";
import toast from "react-hot-toast";

interface SidebarLink {
  label: string;
  href: string;
  icon: React.ReactNode;
}

interface SidebarProps {
  links: SidebarLink[];
  commonLinks: SidebarLink[];
}

const Sidebar = ({ links, commonLinks }: SidebarProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const { user } = useUser();

  const toggleSidebar = () => setIsOpen(!isOpen);

  const router = useRouter();
  const { setUser, setIsLoading: userLoading, isLoading } = useUser();
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

  const handleClickOutside = (event: MouseEvent) => {
    if (
      sidebarRef.current &&
      !sidebarRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside); // Add event listener when sidebar is open
    } else {
      document.removeEventListener("mousedown", handleClickOutside); // Remove event listener when sidebar is closed
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside); // Cleanup event listener
    };
  }, [isOpen]);

  return (
    <div className="relative">
      {/* Sidebar Toggle Button for small and medium screens */}
      <button
        onClick={toggleSidebar}
        className="absolute top-0 left-0 z-10 lg:hidden p-2 m-2 text-gray-600 hover:text-gray-800"
      >
        <Menu size={28} />
      </button>

      {/* Sidebar Drawer */}
      <div
        ref={sidebarRef}
        className={`fixed top-0 left-0 h-full w-52 md:w-72 bg-gray-200 z-50 transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 lg:translate-x-0 lg:relative lg:flex p-4 flex flex-col`}
      >
        <div className="w-full space-y-3 flex-grow">
          {/* Company logo */}
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

          {/* User Image */}
          <div className="flex justify-center items-center pt-2">
            {user?.profilePhoto ? (
              <Avatar
                src={user?.profilePhoto}
                className="w-20 h-20 text-large"
              />
            ) : (
              <div className="animate-pulse rounded-full bg-gray-400 w-20 h-20" />
            )}
          </div>

          {/* User Name */}
          <div className="font-bold md:text-xl lg:text-2xl text-center text-primary">
            {user?.isVerified ? (
              <div className="flex items-center justify-center gap-1">
                {user?.name}
                {/* Verification badge SVG */}
              </div>
            ) : (
              <div>{user?.name}</div>
            )}
          </div>

          <nav className="p-2 space-y-3">
            {links.map((link, index) => (
              <a
                key={index}
                href={link.href}
                className="flex items-start md:items-center space-x-2 py-1 px-2 text-lg hover:bg-primary hover:text-white rounded font-bold"
              >
                {link.icon}
                <span>{link.label}</span>
              </a>
            ))}
          </nav>

          <Divider className="" />

          <nav className="p-2 space-y-3">
            {commonLinks.map((link, index) => (
              <a
                key={index}
                href={link.href}
                className="flex items-center space-x-2 py-1 px-2 text-lg hover:bg-primary hover:text-white rounded font-bold"
              >
                {link.icon}
                <span>{link.label}</span>
              </a>
            ))}
          </nav>

          <Divider className="" />

          <div onClick={handleLogout} className="px-2 cursor-pointer">
            <div className="flex items-start md:items-center space-x-2 py-1 px-2 text-lg hover:bg-primary hover:text-white rounded font-bold">
              {/* Logout SVG */}
              <span>Logout</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
