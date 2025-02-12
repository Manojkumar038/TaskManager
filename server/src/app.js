const express = require("express");
const cors = require("cors");
const routes = require("./routes");
const connectdb = require("./config/db");

const app = express();

connectdb();

app.use(cors());
app.use(express.json());

app.use("/api", routes); 

app.get("/", (req, res) => {
    res.send("The app is running.");
});

module.exports = app;
