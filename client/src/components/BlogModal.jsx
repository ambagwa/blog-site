import { X } from "lucide-react";
import { Calendar, Tag, User } from "lucide-react";
import { format } from "date-fns";

export const BlogModal = ({ blog, onClose }) => {
  if (!blog) return null; // Don't render if no blog is selected

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-white rounded-md shadow-lg w-[90%] md:w-[60%] lg:w-[50%] p-5 relative animate-in fade-in duration-300">
        {/** Close button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 hover:cursor-pointer"
        >
          <X className="h-4 w-4" />
        </button>

        {/* Blog content */}
        <div className="space-y-3">
          <h2 className="text-lg font-bold text-gray-900">{blog.title}</h2>
          <div className="flex flex-wrap gap-3 text-[10px] text-gray-500">
            <span className="flex gap-1 items-center">
              <User className="h-3 w-3" /> {blog.author.username}
            </span>
            <span className="flex gap-1 items-center">
              <Calendar className="h-3 w-3" />{" "}
              {format(new Date(blog.createdAt), "MMM d, yyyy")}
            </span>
            <span className="flex gap-1 items-center">
              <Tag className="h-3 w-3" /> {blog.category}
            </span>
          </div>

          <p className="text-[13px] text-gray-700 loading-relaxed">
            {blog.content}
          </p>

          {/* Tags */}
          {blog.tags.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-3">
              {blog.tags.map((tag, index) => (
                <span
                  key={index}
                  className="bg-blue-100 text-blue-800 text-[9px] px-2 py-1 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
