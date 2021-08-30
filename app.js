const express = require("express");
const mongoose = require("mongoose");

// TODO: Connect to mongodb database


// Initialized app
const app = express();

// Middlewares
app.set("view engine", "ejs");
app.use(express.urlencoded());
app.use(express.json());
app.use(express.static("public"));

// TODO: Display TODO list


// TODO: Display custom TODO list


// TODO: Add an item to the list


// TODO: Delete an item from the list


// Start the server
app.listen(3000, () => {
  console.log("Server started on port 3000");
});
