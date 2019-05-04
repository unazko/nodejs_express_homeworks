const express = require("express");
const router = express.Router();
const Recipe = require("../models/recipe");
const config = require("../config.json");

router.get("/users/:userId/recipes/:recipeId", async function(req, res, next) {
	try {
		const recipe = await Recipe.findOne(
			{userId: req.params.userId, _id: req.params.recipeId}
		);
		res.send(recipe);
	} catch(err) {
		next(err);
	}
});

router.get("/users/:userId/recipes", async function(req, res, next) {
	try {
		const recipe = await Recipe.find({userId: req.params.userId});
		res.send(recipe)
	} catch(err) {
		next(err);
	}
});

router.post("/users/:userId/recipes", async function(req, res, next) {
	try {
		const recipe = new Recipe(req.body);
		recipe.userId = req.params.userId;
		await recipe.save();
		res.set("Location", `${req.originalUrl}/${recipe._id}`);
		res.status(201).send(recipe);
	} catch(err) {
		next(err);
	}
});

router.put("/users/:userId/recipes/:recipeId", async function(req, res, next) {
	try {
		const recipe = await Recipe.findOneAndUpdate(
			{_id: req.params.recipeId, userId: req.params.userId},
			{ ...req.body, lastModified: new Date() },
			{ runValidators: true, new: true }
		);
		res.send(recipe);
	} catch(err) {
		next(err);
	}
});

router.delete("/users/:userId/recipes/:recipeId", async function(req, res, next) {
	const recipe = await Recipe.findOneAndDelete(
		{_id: req.params.recipeId, userId: req.params.userId}
	);
	res.send(recipe);
});

module.exports = router;