const mongoose = require('mongoose');

/**
 * Define item schema
 * It will contain the following fields
 * name
 */
const itemsSchema = mongoose.Schema({
	name: String,
});

// Create model based on item schema
const Item = mongoose.model('item', itemsSchema);

module.exports = { Item, itemsSchema };
