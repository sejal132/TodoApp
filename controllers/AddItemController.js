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

	// Create new item object
	const item = new Item({
		name: itemName,
	});

	/**
	 * Check the listName and save the item in the appropriate list
	 * Redirect user to the same list
	 */
	if (listName == d.getDate()) {
		item.save();
		res.redirect('/');
	} else {
		List.findOne({ name: listName }, (err, foundList) => {
			if(err) {
				console.log(err);
				res.redirect('/' + listName);
			} else {
				foundList.items.push(item);
				foundList.save();
				res.redirect('/' + listName);
			}
		});
	}
};

module.exports = { addItemController };
