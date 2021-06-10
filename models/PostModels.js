const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const postSchema = new Schema({
	userId: {
		type: String,
	},
	title: {
		type: String,
	},
	metaDescription: {
		type: String,
	},
	keywords: {
		type: String,
	},
	body: {
		type: String,
	},
	writer: {
		type: String,
	},
	createdAt: {
		type: Date,
		default: Date.now(),
	},
});

module.exports = mongoose.model('postdbs', postSchema);
