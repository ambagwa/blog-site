import { Link } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";
import { Button } from "@/components/ui/button";
import { getUserRole, getUsername, getUserFromToken } from "../utils/auth";
import { BookOpenIcon, PencilSquareIcon } from "@heroicons/react/24/solid";
import { LogOut } from "lucide-react";
import { useState } from "react";

export const Navbar = () => {
  const userRole = getUserRole();
  const username = getUsername();

  const [active, setActive] = useState("explore");

  const handleNavClick = (section) => {
    setActive(section);
  };

  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  // Check if user is admin
  const isAdmin = userRole === "admin";

  return (
    <nav className="bg-white dark:bg-gray-800 sticky top-0 z-50 border-b md:px-20 border-zinc-200 dark:border-zinc-700 px-4 py-4 flex items-center justify-between shadow-lg">
      <div className="flex items-center space-x-2">
        <BookOpenIcon className="size-8 text-blue-500" />
        <Link to="/dashboard" className="font-bold text-xl mb-1">
          BlogHub
        </Link>
      </div>

      <div className="flex items-center gap-1 justify-end">
        <div className="flex">
        {/**Explore button - Only shown to admin */}
        {isAdmin && (
          <Link to="/dashboard/explore">
            <Button
              size="md"
              className={`hover:cursor-pointer ${
                active === "explore" ? "bg-blue-600 text-white" : ""
              }`}
              variant={active === "explore" ? "blue" : "ghost"}
              onClick={() => handleNavClick("explore")}
            >
              Explore
            </Button>
          </Link>
        )}

        {/**My Blogs button - show to all users */}
        <Link to="/dashboard/my-blogs">
          <Button
            size="md"
            onClick={() => handleNavClick("myblogs")}
            variant={active === "myblogs" ? "blue" : "ghost"}
            className={`hover:cursor-pointer flex items-center gap-1 ${
              active === "myblogs" ? "bg-blue-600 text-white" : "ss"
            }`}
          >
            <PencilSquareIcon />
            My Blogs
          </Button>
        </Link>
        </div>

        <ThemeToggle />
        <div className="flex items-center gap-3">
          <span className="text-sm text-gray-600 md:ml-5 bg-blue-100 py-1 px-2 rounded-4xl">
            {isAdmin ? "Admin" : username }
          </span>
          <Button
          variant="ghost"
            onClick={logout}
            className="flex items-center  dark:text-gray-500  hover:text-red-600 dark:hover:text-red-600 transition-colors hover:cursor-pointer"
            title="Log Out"
          >
            <LogOut size={12} />
          </Button>
        </div>
      </div>
    </nav>
  );
};
