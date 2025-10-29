import React, { useState } from "react";
import { Button } from "./ui/button";

const ExploreNavbar = ({ handleBlogCategories }) => {
  const [active, setActive] = useState("all");

  const handleNavCLick = (category) => {
    setActive(category);
    handleBlogCategories(category);
  };

  const categories = [
    "all",
    "business",
    "food",
    "health",
    "lifestyle",
    "technology",
    "travel",
  ];

  return (
    <div className="flex flex-wrap items-center space-x-2 md:px-16">
      {categories.map((category) => (
        <Button
          key={category}
          size="xs"
          variant={active === category ? "blue" : "ghost"}
          className={`text-[9px] font-normal tracking-wide rounded-3xl p-2 hover:cursor-pointer ${
            active === category
              ? "bg-blue-600 text-white"
              : "text-gray-700 hover:bg-gray-200"
          }`} 
          onClick={() => handleNavCLick(category)}
        >
          {category.charAt(0).toUpperCase() + category.slice(1)}
        </Button>
      ))}
    </div>
  );
};

export default ExploreNavbar;
