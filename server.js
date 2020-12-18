//Dependencies 

const fs = require("fs");
const database = require("./db/db.json");
const path = require("path");
const express = require("express");

//Express linkage
let app = express();
let PORT = process.env.PORT || 3001;





app.use(express.static('public'));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "/public/index.html"));
});

// Notes html and it's "url"
app.get("/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "/public/notes.html"));
})


app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
});
