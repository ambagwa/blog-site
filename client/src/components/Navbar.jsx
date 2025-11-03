import { useState } from "react";
import { Link } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";
import { Button } from "@/components/ui/button";
import { getUserRole, getUsername } from "../utils/auth";
import {
  BookOpenIcon,
  PencilSquareIcon,
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/solid";
import { LogOut } from "lucide-react";

export const Navbar = () => {
  const userRole = getUserRole();
  const username = getUsername();
  const isAdmin = userRole === "admin";

  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState("explore");

  const handleNavClick = (section) => {
    setActive(section);
    setMenuOpen(false); // close menu after clicking a link
  };

  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  return (
    <nav className="bg-white dark:bg-gray-800 sticky top-0 z-50 border-b border-zinc-200 dark:border-zinc-700 shadow-md">
      {/* Single row container */}
      <div className="flex items-center justify-between px-4 py-4">
        {/* Left side - Logo */}
        <div className="flex items-center space-x-2">
          <BookOpenIcon className="size-8 text-blue-500" />
          <Link to="/dashboard" className="font-bold text-xl">
            BlogHub
          </Link>
        </div>

        {/* Desktop navigation - hidden on mobile */}
        <div className="hidden md:flex items-center space-x-4">
          {/* Navigation buttons */}
          <div className="flex items-center gap-4">
            {isAdmin && (
              <Link to="/dashboard/explore">
                <Button
                  size="md"
                  onClick={() => handleNavClick("explore")}
                  className={`${
                    active === "explore" ? "bg-blue-600 text-white" : ""
                  }`}
                  variant={active === "explore" ? "blue" : "ghost"}
                >
                  Explore
                </Button>
              </Link>
            )}

            <Link to="/dashboard/my-blogs">
              <Button
                size="md"
                onClick={() => handleNavClick("myblogs")}
                variant={active === "myblogs" ? "blue" : "ghost"}
                className={`flex items-center gap-1 ${
                  active === "myblogs" ? "bg-blue-600 text-white" : ""
                }`}
              >
                <PencilSquareIcon className="size-4" />
                My Blogs
              </Button>
            </Link>
          </div>

          {/* Right side: Theme + User + Logout */}
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600 bg-blue-100 py-1 px-3 rounded-full">
                {isAdmin ? "Admin" : username}
              </span>
              <Button
                variant="ghost"
                onClick={logout}
                className="flex items-center dark:text-gray-500 hover:text-red-600 dark:hover:text-red-600 transition-colors"
                title="Log Out"
              >
                <LogOut size={14} />
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile menu button and dropdown */}
        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <button
            className="cursor-pointer hover:bg-gray-100 p-2 rounded-sm text-gray-700 dark:text-gray-200 focus:outline-none"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? (
              <XMarkIcon className="w-6 h-6" />
            ) : (
              <Bars3Icon className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile dropdown menu */}
      <div
        className={`md:hidden transition-all duration-300 ease-in-out overflow-hidden ${
          menuOpen ? "max-h-screen pb-4 px-4" : "max-h-0"
        }`}
      >
        <div className="flex flex-col gap-2 mb-3">
          {isAdmin && (
            <Link to="/dashboard/explore">
              <Button
                size="md"
                onClick={() => handleNavClick("explore")}
                className={`w-full ${
                  active === "explore" ? "bg-blue-600 text-white" : ""
                }`}
                variant={active === "explore" ? "blue" : "ghost"}
              >
                Explore
              </Button>
            </Link>
          )}

          <Link to="/dashboard/my-blogs">
            <Button
              size="md"
              onClick={() => handleNavClick("myblogs")}
              variant={active === "myblogs" ? "blue" : "ghost"}
              className={`flex items-center gap-1 w-full ${
                active === "myblogs" ? "bg-blue-600 text-white" : ""
              }`}
            >
              <PencilSquareIcon className="size-4" />
              My Blogs
            </Button>
          </Link>
        </div>

        {/* User info and logout in mobile menu */}
        <div className="flex items-center justify-between pt-2 border-t border-gray-200 dark:border-gray-700">
          <span className="text-sm text-gray-600 bg-blue-100 py-1 px-3 rounded-full">
            {isAdmin ? "Admin" : username}
          </span>
          <Button
            variant="ghost"
            onClick={logout}
            className="flex items-center dark:text-gray-500 hover:text-red-600 dark:hover:text-red-600 transition-colors"
            title="Log Out"
          >
            <LogOut size={14} />
            <span className="ml-1">Logout</span>
          </Button>
        </div>
      </div>
    </nav>
  );
};