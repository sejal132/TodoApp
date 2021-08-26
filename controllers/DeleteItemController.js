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
	 * Check the list name and find and delete the item from the appropriate list
	 * Redirect user to updated list
	 */
	if (listName === d.getDate()) {
		Item.findByIdAndRemove(checkedItem, err => {
			if (err) {
				console.log(err);
			} else {
				console.log('Deleted successfully');
			}
			res.redirect('/');
		});
	} else {
		List.findOneAndUpdate(
			{ name: listName },
			{ $pull: { items: { _id: checkedItem } } },
			(err, foundList) => {
				if (err) {
					console.log(err);
				} else {
					console.log('Deleted successfully');
				}
				res.redirect('/' + listName);
			}
		);
	}
};

module.exports = { deleteItemController };
