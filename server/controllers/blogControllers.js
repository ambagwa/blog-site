const Blog = require("../models/Blog");

// GET all blogs
exports.fetchAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().populate("author", "username email");
    if (!blogs || blogs.length === 0)
      return res.status(404).json({ error: "Blogs not found" });
  } catch (error) {
    console.error(`Error while fetching tasks: ${error}`);
    return res.status(500).json({ error: "Internal server error" });
  }
};

// Create blog
exports.createBlog = async (req, res) => {
  try {
    const { title, content, tags, category } = req.body;

    if (!title || !content || !tags || !category)
      return res.status(400).json({ error: "All blog details are required" });

    // Use logged in user as the author
    const author = req.user?.id;
    if (!author)
      return res
        .status(401)
        .json({ error: "Unauthorized: Please log in to create a blog" });

    // Check for duplicates
    const existingBlog = await Blog.findOne({ title, author });
    if (existingBlog)
      return res
        .status(409)
        .json({ error: "You already have a blog with this title" });

    const blog = await Blog.create({ title, content, author, tags, category });

    res.status(201).json({ blog });
  } catch (error) {
    console.error(`Error while creating blog: ${error}`);
    return res.status(500).json({ error: "Internal server error" });
  }
};

// GET /api/tasks/me
exports.fetchMyBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find({ author: req.user.id });
    if (!blogs || blogs.length === 0)
      return res.status(404).json({ error: "No blogs found for this user" });

    res.status(200).json({ blogs });
  } catch (error) {
    console.error(`Error while fetchingblog: ${error}`);
    return res.status(500).json({ error: "Internal server error" });
  }
};

// UPDATE /api/tasks/:id
exports.updateBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    // Check if user owns the blog or is admin
    if (blog.author.toString() !== req.user.id && req.user.role !== "admin") {
      return res
        .status(403)
        .json({ message: "Not authorized to update this blog" });
    }

    const updatedTask = await Blog.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.json(updatedTask);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// DELETE /api/tasks/:id
exports.deleteBlog = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) return res.status(400).json({ error: "ID is required" });

    const blog = await Blog.findById(id);

    if (!blog) return res.status(404).json({ error: "Task not found" });

    // Check if user owns the blog or is admin
    if (blog.author.toString() !== req.user.id && req.user.role !== "admin")
      return res
        .status(403)
        .json({ error: "Not authorized to delete this blog." });

    await Blog.findByIdAndDelete(id);

    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    console.error(`Error while deleting blog: ${error}`);
    return res.status(500).json({ error: "Internal server error" });
  }
};
