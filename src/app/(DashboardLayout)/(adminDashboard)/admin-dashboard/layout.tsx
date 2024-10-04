import type { Metadata } from "next";
import { Home, User, Settings, LogOut } from "lucide-react";
import Sidebar from "@/src/components/dashboard/Sidebar";

export const metadata: Metadata = {
  title: "Dashboard - TravelTrove",
  description:
    "Discover, share, and explore travel stories, tips, and guides from a community of travel enthusiasts. Plan your next adventure with expert advice and unique insights into destinations around the world.",
};

export default function AdminDashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const adminLinks = [
    {
      label: "Dashboard",
      href: "/admin/dashboard",
      icon: <Home size={20} />,
    },
    {
      label: "User Management",
      href: "/admin/users",
      icon: <User size={20} />,
    },
    {
      label: "Settings",
      href: "/admin/settings",
      icon: <Settings size={20} />,
    },
    { label: "Logout", href: "/admin/logout", icon: <LogOut size={20} /> },
  ];

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <Sidebar links={adminLinks} />

      {/* Dashboard Content */}
      <main className="flex-1 bg-gray-100 p-6">{children}</main>
    </div>
  );
}
