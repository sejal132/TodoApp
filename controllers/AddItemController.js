const Item = require('../models/Item').Item;
const List = require('../models/List').List;
const d = require('../date');

const addItemController = (req, res) => {
	/**
	 * req.body contains the following fields:
	 * itemName: String
	 * listName: String
	 */
	const itemName = req.body.newItem;
	const listName = req.body.list;

	// TODO: Create new item object
	

	/**
	 * TODO:
	 * Check the listName and save the item in the appropriate list
	 * Redirect user to the same list
	 */
};

module.exports = { addItemController };
