const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const productRoutes = require("./routes/ProductRoutes");

const app = express();

// Middleware
app.use(express.json());

app.use(cors());

// MongoDB connection
mongoose
    .connect("mongodb://127.0.0.1:27017/mernPagination")
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