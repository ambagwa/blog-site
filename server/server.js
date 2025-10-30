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

// Debug middleware to see incoming requests
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
  console.log("Origin:", req.headers.origin);
  console.log("Headers:", req.headers);
  next();
});

// CORS configuration
const corsOptions = {
  origin: function (origin, callback) {
    console.log("CORS check for origin:", origin);

    // Allow requests with no origin (mobile apps, curl, postman)
    if (!origin) {
      console.log("No origin - allowing");
      return callback(null, true);
    }

    if (allowedOrigins.includes(origin)) {
      console.log("Origin allowed:", origin);
      callback(null, true);
    } else {
      console.log("Origin blocked:", origin);
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
};

// CORS middleware
app.use(cors(corsOptions));

// Explicitly handle preflight requests
app.options(/.*/, cors(corsOptions));

// middleware
app.use(express.json());

// Test route
app.get("/test-cors", (req, res) => {
  res.json({
    message: "Server is running",
    origin: req.headers.origin,
    timestamp: new Date().toISOString(),
  });
});

// Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/blog", require("./routes/blogRoutes"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  console.log("Allowd origins:", allowedOrigins);
});
