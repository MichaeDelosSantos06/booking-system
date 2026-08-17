import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Outlet } from "react-router-dom";

import SideBar from "./SideBar";

const AdminLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden bg-gray-500/5">
      {/* Desktop Sidebar */}
      <div className="hidden lg:block">
        <SideBar />
      </div>

      {/* Mobile / Tablet Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 transform lg:hidden ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-out`}
      >
        <div className="relative h-full">
          <SideBar />

          {/* Close button */}
          <button
            type="button"
            onClick={() => setIsSidebarOpen(false)}
            className="absolute right-4 top-5 flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg bg-white/10 text-white transition-colors hover:bg-white/20"
          >
            <X size={20} />
          </button>
        </div>
      </div>

      {/* Overlay */}
      {isSidebarOpen && (
        <div
          onClick={() => setIsSidebarOpen(false)}
          className="fixed inset-0 z-40 bg-black/40 lg:hidden"
        />
      )}

      {/* Main Content */}
      <main className="flex min-w-0 flex-1 flex-col font-poppins">
        {/* Mobile / Tablet Header */}
        <div className="shrink-0 px-4 py-5 sm:px-6 sm:py-6 lg:hidden">
          <button
            type="button"
            onClick={() => setIsSidebarOpen(true)}
            className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg bg-black text-white transition-colors hover:bg-gray-800"
          >
            <Menu size={20} />
          </button>
        </div>

        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
