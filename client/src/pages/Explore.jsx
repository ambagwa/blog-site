import { useState, useEffect } from "react";
import API from "../services/api";
import ExploreNavbar from "@/components/ExploreNavbar";
import { Tag } from "lucide-react";
import { Calendar } from "lucide-react";
import { format } from "date-fns";
import { User } from "lucide-react";

export const Explore = () => {
  const [blogs, setBlogs] = useState([]);
  const [allBlogs, setAllBlogs] = useState([]); // Store unfiltered blogs

  useEffect(() => {
    loadBlogs();
  }, []);

  const loadBlogs = async () => {
    try {
      const res = await API.get("/blog/me");
      setBlogs(res.data.blogs);
      setAllBlogs(res.data.blogs);
    } catch (error) {
      console.error(error);
      setError(error.response?.data?.error || "Something went wrong");
    }
  };

  // Handle filtering
  const handleBlogCategories = (category) => {
    if (category === "all") {
      setBlogs(allBlogs);
    } else {
      const filtered = allBlogs.filter(
        (blog) => blog.category.toLowerCase() === category.toLowerCase()
      );
      setBlogs(filtered);
    }
  };

  return (
    <div className="p-5 bg-blue-50 min-h-screen">
      <h1 className="font-inter font-bold text-gray-900 tracking-wide text-center text-xl">
        Discover amazing blog posts
      </h1>
      <p className="mb-5 font-inter text-center text-[10px] mt-1 tracking-wider text-gray-600">
        Browse through our collection of stories from talented writers
      </p>

      <ExploreNavbar handleBlogCategories={handleBlogCategories} />

      {/**Display all blogs */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-5 md:px-15">
        {blogs && blogs.length > 0 ? (
          blogs.map((blog) => (
            <div
              key={blog._id}
              className="rounded-sm hover:shadow-lg p-3 bg-white shadow-md hover:cursor-pointer group hover:-translate-y-1 transition-all duration-300"
            >
              {/**Floating tabs */}
              <div className="flex gap-2  flex-row">
                <span className="flex gap-1 text-blue-700 bg-blue-50 text-[8px] font-normal p-1 rounded-lg px-3">
                  <Tag className="h-2 w-2 mt-0.5" />
                  {blog.category}
                </span>
                <span className="flex gap-1 p-1 font-normal text-[8px]">
                  <Calendar className="h-2 w-2 mt-0.5" />
                  {format(new Date(blog.createdAt), "MMM d, yyyy")}
                </span>
              </div>
              {/**title */}
              <h2 className="group-hover:text-blue-800 transition-colors duration-200 font-bold tracking-wide text-sm my-2">
                {blog.title}
              </h2>
              {/**content */}
              <p className="text-[10px] text-gray-500 line-clamp-3">
                {blog.content}
              </p>

              {/**Tag pills */}
              {blog.tags.length > 0 && (
                <div className="flex flex-wrap gap-1 mt-2">
                  {" "}
                  {/* Changed from gap-2 to gap-1 and added flex-wrap */}
                  {blog.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="bg-blue-100 text-blue-800 text-[8px] px-2 py-1 rounded-full whitespace-nowrap"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              {/**User */}
              <span className="flex gap-1 p-1 my-1 font-normal text-[8px]">
                <User className="h-2 w-2 mt-0.5" />
                {blog.author.username}
              </span>
            </div>
          ))
        ) : (
          <p className="text-center text-red-500">No blogs found</p>
        )}
      </div>
    </div>
  );
};
