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
import { ThemeSwitch } from "../../../theme-switch";
import Link from "next/link";

export default function Navbar() {
  const pathname = usePathname();

  return (
    <NextUINavbar
      maxWidth="xl"
      position="sticky"
      className="py-2"
      classNames={{
        item: [
          "flex",
          "relative",
          "h-full",
          "items-center",
          "data-[active=true]:after:content-['']",
          "data-[active=true]:after:absolute",
          "data-[active=true]:after:bottom-0",
          "data-[active=true]:after:left-0",
          "data-[active=true]:after:right-0",
          "data-[active=true]:after:h-[2px]",
          "data-[active=true]:after:rounded-[2px]",
          "data-[active=true]:after:bg-primary",
        ],
      }}
    >
      <NavbarBrand>
        <p className="font-bold text-inherit">ACME</p>
      </NavbarBrand>

      <NavbarContent className="hidden sm:flex gap-6" justify="center">
        {siteConfig.navItems.map((item) => (
          <NavbarItem key={item.label} isActive={pathname === item.href}>
            <Link
              href={item.href}
              aria-current={pathname === item.href ? "page" : undefined}
            >
              {item.label}
            </Link>
          </NavbarItem>
        ))}
      </NavbarContent>

      <NavbarContent justify="end">
        <ThemeSwitch />

        <NavbarItem className="hidden md:flex">
          <Link href={"/login"}>
            <Button btnText="Login" width="100px" height="45px" />
          </Link>
        </NavbarItem>

        <div className="md:hidden">
          <NavbarMenuToggle />
        </div>
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
