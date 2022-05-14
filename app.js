const express = require("express");
var cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
const userRoute = require("./routes/users");
const authRoute = require("./routes/auth");
const houseRoute = require("./routes/house");
const methodOverride = require("method-override");
const app = express();

const uri = process.env.MONGODB_URI;

// connect to mongo
mongoose.connect(uri, {
	useNewUrlParser: true, useUnifiedTopology: true
	}).then(() => {
	console.log('Connected to Database')
	})

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));


// middleware
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
	res.render("index");
});chur

// routes
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/house", houseRoute);
const PORT = process.env.PORT;

app.listen(PORT, () =>
	console.log(`listening on the sha or ${PORT}`)
); //if mongoose is connected, then the server will start

mongoose.connection.on("connected", () => {
	console.log('Mongoose is connected');
});
