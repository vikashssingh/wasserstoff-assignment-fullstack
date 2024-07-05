const express = require("express");
const bodyParser = require("body-parser");
const route = require("./routes/route.js");
const mongoose = require("mongoose");
const cors = require('cors');
const app = express();

app.use(bodyParser.json());
app.use(cors())

mongoose.connect("mongodb+srv://vikash_5520:oHvOf7lGe6Rfj20Z@cluster0.dqgltt5.mongodb.net/feynman-board", {
    useNewUrlParser: true,
})
    .then(() => console.log("MongoDb is connected"))
    .catch(err => console.log(err));

app.use("/", route);

app.listen(3001, function () {
    console.log("Express app running on port " + 3001);
});