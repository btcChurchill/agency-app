const router = require("express").Router();
const House = require("../models/house");
const User = require("../models/user");

// get all existing post
router.get("/", async (req, res) => {
	try {
		const allPost = await House.find();
		res.json(allPost);
	} catch (error) {
		res.send("theres something wrong g");
	}
});

// create a post
router.post("/", async (req, res) => {
	const newHouse = new House(req.body);
	try {
		const savedHouse = await newHouse.save();
		res.status(200).json(savedHouse);
	} catch (error) {
		res.status(500).json(error);
	}
});

// get a post
router.get("/:id", async (req, res) => {
	try {
		const house = await House.findById(req.params.id);
		res.status(200).json(house);
	} catch (error) {
		res.status(500).json(error);
	}
});

// update a post
router.put("/:id", async (req, res) => {
	try {
		const house = await House.findById(req.params.id);
		if (house.userId === req.body.userId) {
			await house.updateOne({ $set: req.body });
			res.status(200).json("the post has been updated");
		} else {
			res.status(403).json("you can only update your post");
		}
	} catch {
		res.status(500).json("something must be wrong with you");
	}
});

// delete a post
router.delete("/:id", async (req, res) => {
	try {
		const house = await House.findById(req.params.id);
		if (house.userId === req.body.userId) {
			await house.deleteOne({ $set: req.body });
			res.status(200).json("the post has been deleted");
		} else {
			res.status(403).json("you can only delete your post");
		}
	} catch (error) {
		res.status(500).json("there's an error here");
	}
});

// get all user's post
router.get("/profile/:username", async (req, res) => {
	try {
		const user = await User.findOne({ username: req.params.username });
		const house = await House.find({ userId: user._id });
		res.status(200).json(house);
	} catch (error) {
		res.status(500).json("there's an error here");
	}
});

// like/dislike a post
router.put("/:id/like", async (req, res) => {
	try {
		const house = await House.findById(req.params.id);
		if (!house.likes.includes(req.body.userId)) {
			await house.updateOne({ $push: { likes: req.body.userId } });
			res.status(200).json("this house has been liked");
		} else {
			await house.updateOne({ $pull: { likes: req.body.userId } });
			res.status(200).json("the post has been disliked");
		}
	} catch (error) {
		res.status(500).json("there's an error here");
	}
});

module.exports = router;
