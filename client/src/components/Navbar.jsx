import { Link, useNavigate, useLocation } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";
import { Button } from "@/components/ui/button";
import { getUserRole, getUsername, getUserFromToken } from "../utils/auth";
import { BookOpenIcon, PencilSquareIcon } from "@heroicons/react/24/solid";
import { LogOut } from "lucide-react";
import { useState } from "react";

export const Navbar = () => {
  const userRole = getUserRole();
  const user = getUserFromToken();
  const username = getUsername();
  const navigate = useNavigate();
  const location = useLocation();

  const [active, setActive] = useState("explore");

  const handleNavClick = (section) => {
    setActive(section);
  };

  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  return (
    <nav className="bg-white sticky top-0 z-50 border-b md:px-20 border-zinc-200 dark:border-zinc-700 px-4 py-2 flex items-center justify-between shadow-lg">
      <div className="flex items-center space-x-1">
        <BookOpenIcon className="size-6 text-blue-500" />
        <Link to="/dashboard" className="font-bold text-lg">
          BlogHub
        </Link>
      </div>

      <div className="flex items-center gap-1 justify-end">
        {/**Explore button */}
        <Link to="/dashboard/explore">
          <Button
            size="xs"
            className={`hover:cursor-pointer ${
              active === "explore" ? "bg-blue-600 text-white" : ""
            }`}
            variant={active === "explore" ? "blue" : "ghost"}
            onClick={() => handleNavClick("explore")}
          >
            Explore
          </Button>
        </Link>

        {/**My Blogs button */}
        <Link to="/dashboard/my-blogs">
          <Button
            size="xs"
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

        <ThemeToggle />
        <div className="flex items-center gap-3">
          <span className="text-sm text-gray-600">{username}</span>
          <button
            onClick={logout}
            className="flex items-center text-gray-700 hover:text-red-600 transition-colors hover:cursor-pointer"
            title="Log Out"
          >
            <LogOut size={12} />
          </button>
        </div>
      </div>
    </nav>
  );
};
