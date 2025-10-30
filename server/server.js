const express = require("express");
const cors = require("cors");
require("dotenv").config();
const connectDB = require("./config/db");

const app = express();
connectDB();

// Allowed oigins
const allowedOrigins = [
  "http://localhost:5173",
  "https://blog-site-frontend-1ol0.onrender.com",
];

// CORS configuration
const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (mobile apps, curl, postman)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
};

// CORS middleware
app.use(cors(corsOptions));

// middleware
app.use(express.json());

// Test route
app.get("/", (req, res) => {
  res.json({ message: "Server is running" });
});

// Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/blog", require("./routes/blogRoutes"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
