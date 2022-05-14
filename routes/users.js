const router = require("express").Router();
const User = require("../models/user.js");
const bcrypt = require("bcrypt");

// router.get("/", (req, res) => {
// 	res.send("we day here");
// });

// get a user
router.get("/", async (req, res) => {
	const userId = req.query.userId;
	const username = req.query.username;
	try {
		const user = userId
			? await User.findById(userId)
			: await User.findOne({ username: username });
		res.status(200).json(user);
	} catch (error) {
		res.status(500).json(error);
	}
});

// update a user
router.put("/:id", async (req, res) => {
	if (req.body.userId === req.params.id || req.body.isAdmin) {
		if (req.body.password) {
			try {
				const salt = await bcrypt.genSalt(10);
				req.body.password = await bcrypt.hash(req.body.password, salt);
			} catch (err) {
				res.status(500).json(err);
			}
		}
		try {
			const user = await User.findByIdAndUpdate(req.params.id, {
				$set: req.body,
			});
			res.status(200).json("account has been updated");
		} catch (error) {
			res.status(500).json(error);
		}
	} else {
		return res.status(403).json("you can only update your account");
	}
});

// delete a user
router.delete("/:id", async (req, res) => {
	if (req.body.userId === req.params.id || req.body.isAdmin) {
		try {
			const user = await User.findByIdAndDelete(req.params.id);
			res.status(200).json("account has been deleted");
		} catch (error) {
			res.status(500).json(error);
		}
	} else {
		return res.status(403).json("you can delete only your account");
	}
});

module.exports = router;
