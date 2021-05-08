const path = require("path");
const express = require("express");

const commentsRouter = require("./comments.routes");

const app = express();

app.use(express.static(path.resolve(__dirname, "..", "public")));
app.use("/temp", express.static(path.resolve(__dirname, "..", "temp")))

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/comments", commentsRouter);


module.exports = app;