const express = require("express");
const mongoose = require("mongoose");
const DisplayListController = require("./controllers/DisplayListController");
const AddItemController = require("./controllers/AddItemController");
const DeleteItemController = require("./controllers/DeleteItemController");

// Connected to mongodb database
mongoose.connect("mongodb://localhost:27017/todoappDB", {
  useNewUrlParser: true,
});

// Initialized app
const app = express();

// Middlewares
app.set("view engine", "ejs");
app.use(express.urlencoded());
app.use(express.json());
app.use(express.static("public"));

// Display TODO list
app.get("/", DisplayListController.displayListController);

// Display custom TODO list
app.get("/:customListName", DisplayListController.displayCustomListController);

// Add an item to the list
app.post("/", AddItemController.addItemController);

// Delete an item from the list
app.post("/delete", DeleteItemController.deleteItemController);

// Start the server
app.listen(3000, () => {
  console.log("Server started on port 3000");
});
