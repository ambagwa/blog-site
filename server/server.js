const express = require("express");
const cors = require("cors");
require("dotenv").config({ debug: true });
const connectDB = require("./config/db");
const swaggerDocs = require("./swagger");

const app = express();
connectDB();

// middleware
app.use(cors());
app.use(express.json());

app.use("/uploads", express.static("uploads"));

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

// Swagger docs endpt
swaggerDocs(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
