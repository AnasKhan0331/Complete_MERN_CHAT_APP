const express = require("express");
const cors = require("cors");
require("dotenv").config();
const router = require("./router"); // Ensure the router is correctly imported
const app = express();

const { connectDB } = require("./config/connectDB");
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);

const PORT = process.env.PORT || 5000;

app.get("/", (request, response) => {
  response.json({
    message: "Server is running at port " + PORT,
  });
});

app.use(express.json()); // Correct the usage of express.json

// API end points
app.use("/api", router);

// Use connectDB correctly
connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log("Server is running at port " + PORT);
    });
  })
  .catch((error) => {
    console.error("Failed to connect to the database:", error);
  });
