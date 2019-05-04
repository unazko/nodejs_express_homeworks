const express = require("express");
const router = express.Router();
const User = require("../models/user");
const config = require("../config.json");

router.get("/users/:userId", async function(req, res, next) {
	try {
		const user = await User.findById(req.params.userId);
		const { password, ...userWithoutPassword } = user.toObject();
		res.send(userWithoutPassword);
	} catch(err) {
		next(err);
	}
});

router.get("/users", async function(req, res, next) {
	try {
		const users = await User.find({});
		const usersWithoutPassword = [];
		users.forEach(function(user) {
			const { password, ...userWithoutPassword } = user.toObject();
			usersWithoutPassword.push(userWithoutPassword);
		});
		res.send(usersWithoutPassword)
	} catch(err) {
		next(err);
	}
});

router.post("/users", async function(req, res, next) {
	try {
		const user = new User(req.body);
		req.body.gender === "male" ?
			user.picture = `${req.protocol}://${req.get("host")}/images/male.png` :
			user.picture = `${req.protocol}://${req.get("host")}/images/female.png`;
		await user.save();
		res.set("Location", `${req.originalUrl}/${user._id}`);
		res.status(201).send(user);
	} catch(err) {
		next(err);
	}
});

router.put("/users/:userId", async function(req, res, next) {
	try {
		const updatedUser = await User.findByIdAndUpdate(
			req.params.userId,
			{ ...req.body, lastModified: new Date() },
			{ runValidators: true, new: true }
		);
		const { password, ...userWithoutPassword } = updatedUser.toObject();
		res.send(userWithoutPassword);
	} catch(err) {
		next(err);
	}
});

router.delete("/users/:userId", async function(req, res, next) {
	const user = await User.findByIdAndDelete(req.params.userId);
	const { password, ...userWithoutPassword } = user.toObject();
	res.send(userWithoutPassword);
});

module.exports = router;