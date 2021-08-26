const express = require("express");
const bodyParser = require("body-parser");
const d = require("./date");
const mongoose = require("mongoose");
const _ = require("lodash");

mongoose.connect("mongodb://localhost:27017/todoappDB", {
  useNewUrlParser: true,
});

var items = [];
var workItems = [];
const app = express();

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

const itemsSchema = mongoose.Schema({
  name: String,
});

const listSchema = mongoose.Schema({
  name: String,
  items: [itemsSchema],
});

const List = mongoose.model("list", listSchema);

const Item = mongoose.model("item", itemsSchema);
const item1 = new Item({
  name: "Welcome to your todo list!",
});
const item2 = new Item({
  name: "Hit + to add an item",
});
const item3 = new Item({
  name: "<-- Hit this to delete an item",
});
const defaultItems = [item1, item2, item3];

app.get("/", (req, res) => {
  var day = d.getDate();
  console.log(day);
  Item.find({}, (err, foundItems) => {
    if (foundItems.length === 0) {
      Item.insertMany(defaultItems, (err) => {
        if (err) console.log(err);
        else {
          console.log("Successfully saved");
        }
      });
    } else {
      res.render("list", { listTitle: day, newListItem: foundItems });
    }
  });
});

// app.get("/:customListName", (req, res) => {
//   const listName = _.capitalize(req.params.customListName);
//   List.findOne({ name: listName }, (err, foundList) => {
//     if (!err) {
//       if (!foundList) {
//         const list = new List({
//           name: listName,
//           items: defaultItems,
//         });
//         list.save();
//         res.redirect("/" + listName);
//       } else {
//         res.render("list", {
//           listTitle: foundList.name,
//           newListItem: foundList.items,
//         });
//       }
//     }
//   });
// });

app.post("/", (req, res) => {
  console.log(req.body);
  const itemName = req.body.newItem;
  const listName = req.body.list;
  console.log(listName);

  const item = new Item({
    name: itemName,
  });
  if (listName == d.getDate()) {
    item.save();
    res.redirect("/");
  } else {
    List.findOne({ name: listName }, (err, foundList) => {
      // console.log(foundList);
      foundList.items.push(item);
      foundList.save();
      res.redirect("/" + listName);
    });
  }
});

app.post("/delete", (req, res) => {
  const checkedItem = req.body.checkbox;
  const listName = req.body.listName;
  if (listName === d.getDate()) {
    Item.findByIdAndRemove(checkedItem, (err) => {
      if (err) {
        console.log(err);
      } else {
        console.log("Deleted successfully");
        res.redirect("/");
      }
    });
  } else {
    List.findOneAndUpdate(
      { name: listName },
      { $pull: { items: { _id: checkedItem } } },
      (err, foundList) => {
        if (!err) {
          res.redirect("/" + listName);
        }
      }
    );
  }
});

app.listen(3000, () => {
  console.log("Server started on port 3000");
});
