const express = require("express");
const app = express();

const mongoose = require("mongoose");
const cors = require("cors");
const morgan = require("morgan");
const password = require("./config/password");

const user = require("./models/Users");
const routes = require("./routes/index");


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("tiny"));


const uri = `mongodb+srv://fabian:${password}@cluster0.aswml.mongodb.net/horneroApp?retryWrites=true&w=majority`; 

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true,})

const db = mongoose.connection;
    db.once('open', _ => {
    console.log('db is connected to', uri);
})

db.on('error', err => {
    console.log(err);
})


app.use("/api", routes);

app.listen(3001, () => {
    console.log("Server is running on port 3001");
})





