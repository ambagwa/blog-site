import API from "@/services/api";
import { useState } from "react";
import { toast } from "sonner";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { ChevronDown } from "lucide-react";
import { Textarea } from "./ui/textarea";

export const AddBlog = ({ toggleForm, setBlogs, editingBlog }) => {
  const [formData, setFormData] = useState({
    title: editingBlog?.title || "",
    category: editingBlog?.category || "",
    tags: editingBlog?.tags || [],
    content: editingBlog?.content || "",
  });
  const [errors, setErrors] = useState({
    title: "",
    category: "",
    tags: "",
    content: "",
  });
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(
    editingBlog?.category || "Select category"
  );
  const [tagsInput, setTagsInput] = useState(
    editingBlog?.tags?.join(", ") || ""
  );

  const isEditing = Boolean(editingBlog);

  const options = [
    "Business",
    "Food",
    "Health",
    "Lifestyle",
    "Technology",
    "Travel",
  ];

  const handleSelect = (option) => {
    setSelected(option);
    setOpen(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));

    // Clear error as the user types
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  // Check for errors
  const checkErrors = () => {
    let isValid = true;
    const newErrors = { ...errors };

    if (!formData.title.trim()) {
      newErrors.title = "Title of the blog is required";
      isValid = false;
    } else if (formData.title.length < 20) {
      newErrors.title = "Title of the blog should be at keast 20 characters";
      isValid = false;
    }

    if (!formData.category) {
      newErrors.category = "Category of the blog is required";
      isValid = false;
    }

    if (formData.tags.length === 0) {
      newErrors.tags = "Tag is required";
      isValid = false;
    }

    if (!formData.content.trim()) {
      newErrors.content = "Blog content is required";
      isValid = false;
    } else if (formData.content.length < 100) {
      newErrors.content = "Blog content should be at least 100 characters";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!checkErrors()) return;

    setLoading(true);

    try {
      let res;
      if (isEditing) {
        // Update existing blog
        res = await API.put(`/blog/${editingBlog._id}`, formData);
        toast("Blog updated successfully");

        // Refresh list with the updated blog
        setBlogs((prevBlogs) =>
          prevBlogs.map((blog) =>
            blog._id === editingBlog._id ? res.data : blog
          )
        );
      } else {
        //Add new blog
        res = await API.post("/blog", formData);
        toast("Blog added successfully");
        // Refresh list
        setBlogs((prevBlogs) => [res.data.blog, ...prevBlogs]);
      }

      toggleForm();
    } catch (error) {
      console.log(`Error while adding blog: ${error}`);
      toast(error.response?.data?.message || "Blog submission failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/** Modal overlay */}
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
        {/** Modal container */}
        <div className="relative w-full md:max-w-[400px] dark:bg-gray-800 mx-4 bg-white rounded-lg shadow-lg p-4 transform transition all duration-700 animate-in fade-in-50 zoom-in-5 ease-in-out maxx-w-320px[]">
          <h3 className="text-lg font-semibold">
            {editingBlog ? "Edit blog" : "Create New Blog Post"}
          </h3>
          <form className="space-y-3 mt-2">
            <div className="space-y-2">
              {/**Title input*/}
              <div className="space-y-1">
                <Label htmlFor="blogTitle" className="text-[10px] font-medium">
                  Title*
                </Label>
                <Input
                  id="blogTitle"
                  className={`h-6 text-xs transition-all duration-400 ease-in-out ${
                    errors.title
                      ? "border-red-500 ring-1 ring-red-300 focus:ring-red-400 animate-glow"
                      : "border-gray-300 focus:ring-1 focus:ring-blue-500"
                  }`}
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                />
                {/** Blog title error display*/}
                <div
                  className={`transition-all duration-400 overflow-hidden ${
                    errors.title
                      ? "max-h-10 opacity-100 translate-y-0"
                      : "max-h-0 opacity-0 -translate-y-1"
                  }`}
                >
                  {" "}
                  {errors.title && (
                    <p className="text-red-500 text-[10px] mt-1">
                      {errors.title}
                    </p>
                  )}
                </div>
              </div>

              {/**Category input */}
              <div className="space-y-1 relative">
                <Label
                  htmlFor="blogCategory"
                  className="text-[10px] font-medium"
                >
                  Category*
                </Label>
                <Button
                  type="button"
                  variant="outline"
                  size="xs"
                  onClick={() => setOpen(!open)}
                  className={`w-full flex items-center justify-between border rounded-md px-3 py-1.5 text-left text-sm transition-all duration-200 ${
                    errors.category
                      ? "border-red-500 ring-1 ring-red-300"
                      : "border-gray-300 hover:border-blue-400"
                  }`}
                >
                  <span className="text-xs">{selected}</span>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform duration-200 ${
                      open ? "rotate-180" : "rotate-0"
                    }`}
                  />
                </Button>

                {/**Dropdown menu */}
                {open && (
                  <ul className="absolute z-10 mt-1 w-full bg-white border border-gray-200 rounded-md shadow-lg max-h-40 overflow-auto text-sm">
                    {options.map((option) => (
                      <li
                        key={option}
                        onClick={() => {
                          handleSelect(option);
                          setFormData((prev) => ({
                            ...prev,
                            category: option,
                          }));
                        }}
                        className={`px-3 py-1.5 hover:bg-blue-100 cursor-pointer ${
                          selected === option
                            ? "bg-blue-50 text-blue-600 font-medium"
                            : ""
                        }`}
                      >
                        {option}
                      </li>
                    ))}
                  </ul>
                )}

                {/** Category error message */}
                <div
                  className={`transition-all duration-400 overflow-hidden ${
                    errors.category
                      ? "max-h-10 opacity-100 translate-y-0"
                      : "max-h-0 opacity-0 -translate-y-1"
                  }`}
                >
                  {" "}
                  {errors.category && (
                    <p className="text-red-500 text-[10px] mt-1">
                      {errors.category}
                    </p>
                  )}
                </div>
              </div>

              {/** Tags input */}
              <div className="space-y-1">
                <Label htmlFor="tags" className="text-[10px] font-medium">
                  Tags*
                </Label>
                <Input
                  id="tags"
                  className={`h-6 text-xs transition-all duration-400 ease-in-out ${
                    errors.tags
                      ? "border-red-500 ring-1 ring-red-300 focus:ring-red-400 animate-glow"
                      : "border-gray-300 focus:ring-1 focus:ring-blue-500"
                  }`}
                  name="tags"
                  value={tagsInput}
                  onChange={(e) => {
                    const inputValue = e.target.value;
                    setTagsInput(inputValue);

                    // convert comma searated string to array
                    const tagsArray = inputValue
                      .split(",")
                      .map((tag) => tag.trim())
                      .filter((tag) => tag.length > 0);

                    setFormData((prevState) => ({
                      ...prevState,
                      tags: tagsArray,
                    }));

                    // Clear error as the user types
                    setErrors((prev) => ({ ...prev, tags: "" }));
                  }}
                />

                {/** Display the current tags as chips for better UX */}
                {formData.tags.length > 0 && (
                  <div className="flex gap-2 mt-2">
                    {formData.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="bg-blue-100 text-blue-800 text-[8px] px-2 py-1 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}

                {/** Blog tags error display*/}
                <div
                  className={`transition-all duration-400 overflow-hidden ${
                    errors.tags
                      ? "max-h-10 opacity-100 translate-y-0"
                      : "max-h-0 opacity-0 -translate-y-1"
                  }`}
                >
                  {" "}
                  {errors.tags && (
                    <p className="text-red-500 text-[10px] mt-1">
                      {errors.title}
                    </p>
                  )}
                </div>
              </div>

              {/** Content input */}
              <div className="space-y-1">
                <Label htmlFor="content" className="text-[10px] font-medium">
                  Content*
                </Label>
                <Textarea
                  id="content"
                  className={`h-32 transition-all text-xs duration-400 ease-in-out ${
                    errors.content
                      ? "border-red-500 ring-1 ring-red-300 focus:ring-red-400 animate-glow"
                      : "border-gray-300 focus:ring-1 focus:ring-blue-500"
                  }`}
                  name="content"
                  value={formData.content}
                  onChange={handleInputChange}
                />

                {/** Blog content error display*/}
                <div
                  className={`transition-all duration-400 overflow-hidden ${
                    errors.content
                      ? "max-h-10 opacity-100 translate-y-0"
                      : "max-h-0 opacity-0 -translate-y-1"
                  }`}
                >
                  {" "}
                  {errors.content && (
                    <p className="text-red-500 text-[10px] mt-1">
                      {errors.content}
                    </p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-4 gap-2">
                {editingBlog ? (
                  <>
                    <Button
                      className="col-span-3 cursor-pointer"
                      onClick={handleAdd}
                      variant="blue"
                    >
                      {loading ? "Updating ..." : "Update"}
                    </Button>
                    <Button
                      variant="outline"
                      className="cursor-pointer"
                      onClick={toggleForm}
                    >
                      Cancel
                    </Button>
                  </>
                ) : (
                  <>
                    <Button
                      className="col-span-3 cursor-pointer"
                      onClick={handleAdd}
                      variant="blue"
                    >
                      {loading ? "Adding ..." : "Add"}
                    </Button>
                    <Button
                      variant="outline"
                      className="cursor-pointer"
                      onClick={toggleForm}
                    >
                      Cancel
                    </Button>
                  </>
                )}
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
