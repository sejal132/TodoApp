const mongoose = require('mongoose');
const Item = require('./Item');

/**
 * Define list schema
 * It will contain the following fields
 * name, items
 */
const listSchema = mongoose.Schema({
	name: String,
	items: [Item.itemsSchema],
});

// Create model using list schema
const List = mongoose.model('list', listSchema);

module.exports = { List, listSchema };
