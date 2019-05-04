const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const config = require("./config.json");

// set up express app
const app = express();

mongoose.promise = global.Promise;

// connect to mongodb
mongoose.connect(config.connectionString, {
	useNewUrlParser: true,
	useCreateIndex: true,
	useFindAndModify: false
});

mongoose.connection.once("open", function() {
	console.log("Connection has been made.");
}).on("error", function(erorr) {
	console.log("Connection error", error);
});

// middleware to enable cross site origin requests
app.use(cors({
	origin: "*",
	methods: ["GET", "PUT", "POST", "DELETE"],
	preflightContinue: true,
	optionsSuccessStatus: 200
}));


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static("public"));

// initialize routes
app.use("/api", require("./routes/userRoutes"));
app.use("/api", require("./routes/recipeRoutes"));

// 404 error handler
app.use(function(req, res, next) {
	res.status(404).send({message: `Route ${req.url} Not found`});
});

// All error handling middleware
app.use(function(err, req, res, next) {
	console.log(err);
	res.status(422).send({error: err.message});
});

// listen for requests
const server = app.listen(config.port, function() {
	console.log(`Listening on port ${config.port}`);
})

