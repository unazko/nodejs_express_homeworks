const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProjectSchema = new Schema({
	enrollmentDate: {
		type: Date,
		default: Date.now
	},
	authors: {
		type: [String],
		default: []
	},
	projectName: {
		type: String,
		required: [true, "Project name is required"]
	},

	// This address need to be validated
	gitHubURL: {
		type: String,
		validate: {
			// validation function from following address:
			// https://stackoverflow.com/questions/5717093/check-if-a-javascript-string-is-a-url
			validator: function(url) {
				var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
					'((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ 	// domain name
					'((\\d{1,3}\\.){3}\\d{1,3}))'+ 							// OR ip (v4) address
					'(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ 						// port and path
					'(\\?[;&a-z\\d%_.~+=-]*)?'+ 							// query string
					'(\\#[-a-z\\d_]*)?$','i'); 								// fragment locator
				return !!pattern.test(url);
			},
			message: function(props) {
				return `${props.value} is not a valid URL.`;
			}
		},
		required: [true, "Github URL is required"]
	},
	description: {
		type: String,
		default: ""
	},
	keyWords: {
		type: [String],
		default: []
	},
	status: {
		type: Boolean,
		default: false
	}
});

const Project = mongoose.model("project", ProjectSchema);

module.exports = Project;