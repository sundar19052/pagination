const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const productRoutes = require("./routes/ProductRoutes");

const app = express();

// Middleware
app.use(express.json());

app.use(cors());
const dns = require("dns");

dns.setServers([
  "8.8.8.8",
  "1.1.1.1"
]);

mongoose
  .connect("mongodb+srv://sundarsrini1905_db_user:9f8IxBDU4FrcQWtk@cluster0.m2uyoqr.mongodb.net/mernPagination?retryWrites=true&w=majority")
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((error) => {
    console.log("MongoDB error:", error);
  });

// Routes
app.use("/api", productRoutes);

// Server
app.listen(5000, () => {

    console.log("Server running on port 5000");

});