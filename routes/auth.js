const router = require("express").Router();
const bcrypt = require("bcrypt");
const User = require("../models/user");

var validateEmail = function (email) {
	var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email);
};

// register a user
router.post("/register", async (req, res) => {
	try {
		// generate a new password
		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(req.body.password, salt);

		if (validateEmail(req.body.email)) {
			// create user
			const newUser = new User({
				username: req.body.username,
				email: req.body.email,
				password: hashedPassword,
			});

			// save user
			const user = await newUser.save();
			res.status(200).json(user);
		} else {
			res.status(500).json("its not an email");
		}
	} catch (error) {
		res.status(500).json(error);
	}
});

// login
router.post("/login", async (req, res) => {
	try {
		const user = await User.findOne({ email: req.body.email });

		if (!user) {
			res.status(200).send("user not found");
		} else {
			const validPassword = await bcrypt.compare(
				req.body.password,
				user.password
			);
			if (!validPassword) {
				res.status(404).json("wrong username or password");
			} else {
				res.status(200).json(user);
			}
		}
	} catch (error) {
		console.log(error);
		res.status(500).json(error);
	}
});

module.exports = router;
