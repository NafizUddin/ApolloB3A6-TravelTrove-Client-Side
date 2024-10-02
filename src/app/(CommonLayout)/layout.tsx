import Footer from "@/src/components/modules/shared/Footer/Footer";
import Navbar from "@/src/components/modules/shared/Navbar/Navbar";
import type { Metadata } from "next";

export default function CommonLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <Navbar />
      {children}
    </div>
  );
}
