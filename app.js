const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const todoRoutes = require("./routes/todoRoutes");

const app = express();

const dotenv = require("dotenv");
dotenv.config();


// Hardcoded Environment Variables
const PORT = 5000;
const MONGO_URI = "mongodb://127.0.0.1:27017/todoDB";
const JWT_SECRET = "monika_secret_key"; 

app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/todos", todoRoutes);

// Default Route
app.get("/", (req, res) => {
  res.send("Todo Backend Running ");
});

// Start Server
app.listen(PORT, () => console.log(` Server running on port ${PORT}`));
