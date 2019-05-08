const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const recipeSchema = new Schema({
	userId: {
		type: Schema.Types.ObjectId,
		ref: "User"
	},
	name: {
		type: String,
		maxlength: [80, "Recipe name is to long"],
		required: [true, "Recipe name is required"]
	},
	shortDescription: {
		type: String,
		maxlength: [256, "Recipe shortDescription is to long"],
		required: [true, "Recipe shortDescription is required"]
	},
	prepareTime: {
		type: Number,
		required: [true, "Recipe prepareTime is required"]
	},
	products: {
		type: [String],
		required: [true, "Recipe products are required"]
	},
	picture: {
		type: String,
		validate: {
			// validation function from following address:
			// https://www.regextester.com/94502
			validator: function(url) {
				return /^(ftp|http|https|data):[^ "]+$/.test(url);
			},
			message: function(props) {
				return `${props.value} is not a valid URL`;
			}
		},
		required: [true, "Recipe picture is required"]
	},
	description: {
		type: String,
		maxlength: [2048, "Recipe description is to long"],
		default: ""
	},
	keywords: {
		type: [String],
		default: []
	},
	shareDate: {
		type: Date,
		default: Date.now
	},
	lastModified: {
		type: Date,
		default: Date.now
	}
});

const Recipe = mongoose.model("recipe", recipeSchema);

module.exports = Recipe;