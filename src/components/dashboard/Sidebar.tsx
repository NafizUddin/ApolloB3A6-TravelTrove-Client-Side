"use client";

import { useEffect, useRef, useState } from "react";
import { Menu } from "lucide-react";

interface SidebarLink {
  label: string;
  href: string;
  icon: React.ReactNode;
}

interface SidebarProps {
  links: SidebarLink[];
}

const Sidebar = ({ links }: SidebarProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);

  const toggleSidebar = () => setIsOpen(!isOpen);

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
    <div>
      {/* Sidebar Toggle Button for small and medium screens */}
      <button
        onClick={toggleSidebar}
        className="lg:hidden p-2 m-2 text-gray-600 hover:text-gray-800"
      >
        <Menu size={28} />
      </button>

      {/* Sidebar Drawer */}
      <div
        ref={sidebarRef}
        className={`fixed top-0 left-0 h-full w-64 bg-gray-800 text-white z-50 transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 lg:translate-x-0 lg:relative lg:flex`}
      >
        <nav className="p-4 space-y-4">
          {links.map((link, index) => (
            <a
              key={index}
              href={link.href}
              className="flex items-center space-x-2 p-2 text-lg hover:bg-gray-700 rounded"
            >
              {link.icon}
              <span>{link.label}</span>
            </a>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
