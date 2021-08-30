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
	 * TODO:
	 * Find if a list exists
	 * If yes, render that list
	 * else add default list items to the database and render that list
	 */
	const day = d.getDate();
};

const displayCustomListController = (req, res) => {
	/**
	 * TODO:
	 * Get the custom list name from the URL parameters, and capitalize its first letter
	 * Check if the list already exists in the database
	 * if yes, render that list
	 * else add default items, then save and render the list
	 * If error occurs redirect to default list
	 */
};

module.exports = { displayListController, displayCustomListController };
