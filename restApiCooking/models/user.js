const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
	name: {
		type: String,
		default: ""
	},
	username: {
		type: String,
		minlength: [3, "Username length should be more than 3 symbols"],
		maxlength: [15, "Username length should be less than 15 symbols"],
		required: [true, "User username is required"],
		unique: [true, "Username is already taken"]
	},
	password: {
		type: String,
		validate: {
			validator: function(str) {
				var pattern = new RegExp("^(?=.*\\d)(?=.*[^\\w])\\S{8,}$", "i");
				return !!pattern.test(str);
			},
			message: "The password must contain at least 8 symbols, 1 digit and 1 other symbol."
		},
		required: [true, "User password is required"]
	},
	gender: {
		type: String,
		enum: ["male", "female"]
	},
	userRole: {
		type: String,
		default: "user"
	},
	picture: {
		type: String,
		validate: {
			validator: function(url) {
				return /^(ftp|http|https|data):\/\/[^ "]+$/.test(url);
			},
			message: function(props) {
				return `${props.value} is not a valid URL`;
			}
		},
		default: ""
	},
	introduction: {
		type: String,
		maxlength: [512, "The introduction is to long."],
		default: ""
	},
	accountStatus: {
		type: String,
		enum: ["active", "suspended", "deactivated"],
		default: "deactivated"
	},
	registrationDate: {
		type: Date,
		default: Date.now
	},
	lastModified: {
		type: Date,
		default: Date.now
	}
});

const User = mongoose.model("user", userSchema);

module.exports = User;