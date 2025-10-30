import { useState, useEffect } from "react";
import API from "../services/api";
import ExploreNavbar from "@/components/ExploreNavbar";
import { Tag } from "lucide-react";
import { Calendar } from "lucide-react";
import { format } from "date-fns";
import { User } from "lucide-react";
import { BlogModal } from "@/components/BlogModal";
import { Spinner } from "@/components/ui/spinner";
import { AnimatePresence, motion } from "framer-motion";

export const Explore = () => {
  const [blogs, setBlogs] = useState([]);
  const [allBlogs, setAllBlogs] = useState([]); // Store unfiltered blogs
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadBlogs();
  }, []);

  const loadBlogs = async () => {
    setLoading(true);
    try {
      const res = await API.get("/api/blog/all");
      setBlogs(res.data.blogs);
      setAllBlogs(res.data.blogs);
    } catch (error) {
      console.error(error);
      setError(error.response?.data?.error || "Something went wrong");
    } finally {
      setLoading(false);
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

  const openModal = (blog) => {
    setSelectedBlog(blog);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedBlog(null);
  };

  return (
    <div className="p-5 bg-blue-50 dark:bg-gray-900 shadow-lg min-h-screen">
      <h1 className="font-inter font-bold text-gray-900 dark:text-gray-100 tracking-wide text-center text-xl">
        Discover amazing blog posts
      </h1>
      <p className="mb-5 dark:text-gray-200 font-inter text-center text-[10px] mt-1 tracking-wider text-gray-600">
        Browse through our collection of stories from talented writers
      </p>

      <ExploreNavbar handleBlogCategories={handleBlogCategories} />

      {/**Display all blogs */}
      {loading ? (
        <Spinner className="my-5 h-5 w-5 mx-auto" />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-5 md:px-15">
          <AnimatePresence>
            {blogs && blogs.length > 0 ? (
              blogs.map((blog, index) => (
                <motion.div
                  key={blog._id}
                  initial={{ opacity: 0, y: 20 }} // 👈 start slightly lower and invisible
                  animate={{ opacity: 1, y: 0 }} // 👈 fade + slide in
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }} // 👈 stagger animation
                  onClick={() => openModal(blog)}
                  className="rounded-sm hover:shadow-lg p-3 bg-white dark:bg-gray-800 shadow-md hover:cursor-pointer group hover:-translate-y-1 transition-all duration-300"
                >
                  {/**Floating tabs */}
                  <div className="flex gap-2  flex-row">
                    <span className="flex gap-1 text-blue-700 dark:text-blue-400 bg-blue-50 dark:bg-gray-600 text-[8px] font-normal p-1 rounded-lg px-3">
                      <Tag className="h-2 w-2 mt-0.5" />
                      {blog.category}
                    </span>
                    <span className="flex gap-1 p-1 font-normal text-[8px]">
                      <Calendar className="h-2 w-2 mt-0.5" />
                      {format(new Date(blog.createdAt), "MMM d, yyyy")}
                    </span>
                  </div>
                  {/**title */}
                  <h2 className="group-hover:text-blue-800 group-hover:underline transition-colors duration-200 font-bold tracking-wide text-sm my-2">
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
                          className="bg-blue-100 dark:text-blue-200 text-blue-800 text-[8px] px-2 py-1 rounded-full  dark:bg-gray-700 whitespace-nowrap"
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
                </motion.div>
              ))
            ) : (
              <p className="text-center text-red-500">No blogs found</p>
            )}
          </AnimatePresence>
        </div>
      )}

      {/** show modal is open */}
      {isModalOpen && <BlogModal blog={selectedBlog} onClose={closeModal} />}
    </div>
  );
};
