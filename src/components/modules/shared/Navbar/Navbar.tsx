"use client";
import { siteConfig } from "@/src/config/site";
import { Link as NextUILink } from "@nextui-org/link";
import {
  Navbar as NextUINavbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
} from "@nextui-org/navbar";
import { usePathname } from "next/navigation";
import Button from "../../../ui/elements/Button";
import Link from "next/link";
import Image from "next/image";
import logo from "@/src/assets/logo.png";
import { useUser } from "@/src/context/user.provider";
import NavbarUserDropdown from "./NavbarUserDropdown";

export default function Navbar() {
  const pathname = usePathname();
  const { user } = useUser();

  console.log(user);

  return (
    <NextUINavbar
      maxWidth="xl"
      position="sticky"
      className="pt-2 pb-1 lg:pb-4"
      classNames={{
        item: [
          "flex",
          "relative",
          "h-full",
          "items-center",
          "data-[active=true]:after:content-['']",
          "data-[active=true]:after:absolute",
          "data-[active=true]:after:-bottom-3",
          "data-[active=true]:after:left-0",
          "data-[active=true]:after:right-0",
          "data-[active=true]:after:h-[3px]",
          "data-[active=true]:after:rounded-[3px]",
          "data-[active=true]:after:bg-primary",
        ],
      }}
    >
      <NavbarBrand className="mt-3">
        <div className="lg:hidden">
          <NavbarMenuToggle />
        </div>
        <Image
          src={logo}
          alt="logo"
          height={200}
          width={200}
          className="hidden lg:flex"
        />
      </NavbarBrand>

      <NavbarContent justify="center">
        <div className="hidden lg:flex gap-6">
          {siteConfig.navItems.map((item) => (
            <NavbarItem
              className="text-lg"
              key={item.label}
              isActive={pathname === item.href}
            >
              <Link
                href={item.href}
                aria-current={pathname === item.href ? "page" : undefined}
              >
                {item.label}
              </Link>
            </NavbarItem>
          ))}
        </div>
        <Image
          src={logo}
          alt="logo"
          height={170}
          width={170}
          className="flex lg:hidden"
        />
      </NavbarContent>

      <NavbarContent justify="end">
        <NavbarItem className="flex">
          {user ? (
            <NavbarUserDropdown user={user} />
          ) : (
            <Link href={"/login"}>
              <Button btnText="Login" width="100px" height="45px" />
            </Link>
          )}
        </NavbarItem>
      </NavbarContent>

      <NavbarMenu>
        <div className="mx-4 mt-2 flex flex-col gap-2">
          {siteConfig.navMenuItems.map((item, index) => (
            <NavbarMenuItem key={`${item.label}-${index}`}>
              <NextUILink
                color={
                  index === 2
                    ? "primary"
                    : index === siteConfig.navMenuItems.length - 1
                    ? "danger"
                    : "foreground"
                }
                href={item.href}
                size="lg"
              >
                {item.label}
              </NextUILink>
            </NavbarMenuItem>
          ))}
        </div>
      </NavbarMenu>
    </NextUINavbar>
  );
}
