const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    category: { type: String, default: "General" },
    tags: { type: [String], default: [] },
    path: { type: String, required: true },
    filename: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Blog", blogSchema);
