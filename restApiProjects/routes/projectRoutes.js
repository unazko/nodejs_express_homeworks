const express = require("express");
const router = express.Router();
const Project = require("../models/project");
const config = require("../config.json");

router.get("/projects/:id", async function(req, res, next) {
	try {
		const projects = await Project.findById(req.params.id);
		res.send(projects);
	} catch(err) {
		next(err);
	}
});

router.get("/projects", async function(req, res, next) {
	try {
		const projects = await Project.find({});
		res.send(projects);
	} catch(err) {
		next(err);
	}
});

router.post("/projects", async function(req, res, next) {
	try {
		const project = new Project(req.body);
		await project.save();
		res.set('Location', `${req.originalUrl}/${project._id}`);
		res.status(201).send(project);
	} catch(err) {
		next(err);
	}
});

router.put("/projects/:id", async function(req, res, next) {
	try {
		const updatedProject = await Project.findByIdAndUpdate(
			req.params.id,
			req.body,
			{ runValidators: true, new: true }
		);
		res.send(updatedProject);
	} catch (err) {
		next(err);
	}
});

router.delete("/projects/:id", async function(req, res, next) {
	try {
		const project = await Project.findByIdAndDelete(req.params.id);
		res.send(project);
	} catch (err) {
		next(err);
	}
});

module.exports = router;