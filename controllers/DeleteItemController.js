const Item = require('../models/Item').Item;
const List = require('../models/List').List;
const d = require('../date');

const deleteItemController = (req, res) => {
	/**
	 * req.body contains following fields:
	 * checkedItem: String
	 * listName: String
	 */
	const checkedItem = req.body.checkbox;
	const listName = req.body.listName;

	/**
	 * TODO:
	 * Check the list name and find and delete the item from the appropriate list
	 * Redirect user to updated list
	 */
};

module.exports = { deleteItemController };
