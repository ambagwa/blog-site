const express = require("express");
const {
  fetchAllBlogs,
  createBlog,
  fetchMyBlogs,
  updateBlog,
  deleteBlog,
} = require("../controllers/blogControllers");
const { protect, authorize } = require("../middlewares/auth");
const router = express.Router();

router.post("/", protect, createBlog);
router.get("/me", protect, fetchMyBlogs);
router.get("/all", protect, authorize(["admin"]), fetchAllBlogs);
router.put("/:id", protect, updateBlog);
router.delete("/:id", protect, deleteBlog);

module.exports = router;
