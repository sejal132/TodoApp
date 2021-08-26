const Item = require('../models/Item').Item;
const List = require('../models/List').List;
const d = require('../date');
const _ = require('lodash');

// Initialized default items
const item1 = new Item({
	name: 'Welcome to your todo list!',
});
const item2 = new Item({
	name: 'Hit + to add an item',
});
const item3 = new Item({
	name: '<-- Hit this to delete an item',
});
const defaultItems = [item1, item2, item3];

const displayListController = (req, res) => {
	/**
	 * Get the current date
	 * Find if a list exists
	 * If yes, render that list
	 * else add default list items to the database and render that list
	 */
	const day = d.getDate();
	Item.find({}, (err, foundItems) => {
		if (foundItems.length === 0) {
			Item.insertMany(defaultItems, err => {
				if (err) console.log(err);
				else {
					console.log('Successfully saved');
					res.render('list', {
						listTitle: day,
						newListItem: defaultItems,
					});
				}
			});
		} else {
			res.render('list', { listTitle: day, newListItem: foundItems });
		}
	});
};

const displayCustomListController = (req, res) => {
	/**
	 * Get the custom list name from the URL parameters, and capitalize its first letter
	 * Check if the list already exists in the database
	 * if yes, render that list
	 * else add default items, then save and render the list
	 * If error occurs redirect to default list
	 */
	const listName = _.capitalize(req.params.customListName);
	List.findOne({ name: listName }, (err, foundList) => {
		if (!err) {
			if (!foundList) {
				const list = new List({
					name: listName,
					items: defaultItems,
				});
				list.save();
				res.redirect('/' + listName);
			} else {
				res.render('list', {
					listTitle: foundList.name,
					newListItem: foundList.items,
				});
			}
		} else {
			res.redirect("/");
		}
	});
};

module.exports = { displayListController, displayCustomListController };
