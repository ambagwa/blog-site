import { AddBlog } from "@/components/AddBlog";
import { Button } from "@/components/ui/button";
import API from "@/services/api";
import { format } from "date-fns";
import { SquarePen } from "lucide-react";
import { Trash2 } from "lucide-react";
import { PlusIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export const MyBlogs = () => {
  const [isAddBlogFormOpen, setIsAddBlogFormOpen] = useState(false);
  const [blogs, setBlogs] = useState([]);
  const [editingBlog, setEditingBlog] = useState(null);

  const handleOpenForm = () => {
    setIsAddBlogFormOpen((prev) => !prev);
  };

  const loadBlogs = async () => {
    try {
      const res = await API.get("/blog/me");
      setBlogs(res.data.blogs);
    } catch (error) {
      console.error(`Error while fetching blogs: ${error}`);
      console.log(
        error.response?.data?.message || "Error while fetching blogs"
      );
      setBlogs([]);
    }
  };

  useEffect(() => {
    loadBlogs();
  }, []);

  const handleUpdate = (blog) => {
    setEditingBlog(blog);
    setIsAddBlogFormOpen(true);
  };

  const handleDelete = async (id) => {
    await API.delete(`/blog/${id}`);
    setBlogs((prevBlogs) => prevBlogs.filter((b) => b._id !== id));
    toast("Task deleted");
  };

  return (
    <div className="px-5 bg-blue-50 md:px-20 pt-5 font-inter">
      {/** Title */}
      <div className="flex align-center justify-between my-1">
        <h1 className="font-bold text-[14px]">My Blog Posts</h1>
        <Button
          size="xs"
          variant="blue"
          className="hover:cursor-pointer"
          onClick={handleOpenForm}
        >
          <div className="flex space-x-1">
            <PlusIcon />
            <p>New Post</p>
          </div>
        </Button>
      </div>

      {/** Add Blogs modal */}
      {isAddBlogFormOpen && (
        <AddBlog
          toggleForm={() => {
            setIsAddBlogFormOpen(false);
            setEditingBlog(null);
          }}
          editingBlog={editingBlog}
          setBlogs={setBlogs}
        />
      )}

      {/** User blogs */}
      {blogs.map((blog) => (
        <div
          key={blog._id}
          className="p-4 space-y-2 border-b bg-white shadow-md rounded-sm grid grid-cols-5 mt-5 hover:shadow-lg"
        >
          <div className="col-span-4 mr-3">
            <h2 className="font-semibold tracking-wide text-[15px] wrap-break-word">
              {blog.title || "Untitled"}
            </h2>
            <p className="mt-1 text-[10px] text-gray-700 line-clamp-3">
              {blog.content}
            </p>
            <div className="mt-1 flex items-center gap-2 text-[8px] text-gray-500">
              <p>{format(new Date(blog.createdAt), "MMM d, yyyy")}</p>
              <p>{blog.category}</p>
            </div>
          </div>

          <div className="flex mt-1 flex-wrap items-center">
            <Button
              variant="ghost"
              size="xs"
              className="p-1"
              onClick={() => handleUpdate(blog)}
            >
              <SquarePen className="h-4 w-4 text-gray-700" />
            </Button>
            <Button
              variant="ghost"
              size="xs"
              onClick={() => handleDelete(blog._id)}
            >
              <Trash2 className="h-4 w-4 text-red-700" />
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
};
