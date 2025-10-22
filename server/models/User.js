const mongoose = require("mongoose");

// DB schema for a user
const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    avatar: { type: String, default: "https://www.gravatar.com/avatar/?d=mp" },
    role: { type: String, enum: ["blogger", "admin"], default: "blogger" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
