//Dependencies

const fs = require("fs");
const db = require("./db/db.json");
const path = require("path");
const express = require("express");

//Express linkage
let link = express();
let PORT = process.env.PORT || 3001;

//Gotta link to notes
link.use(express.static("public"));

link.use(express.urlencoded({ extended: true }));
link.use(express.json());


//Notes url page
link.get("/notes", (request, response) => {
    response.sendFile(path.join(__dirname, "/public/notes.html"));
  });

//Main page url
link.get("/", (request, response) => {
  response.sendFile(path.join(__dirname, "/public/index.html"));
});



link
  .route("/api/notes")
  //path to note list and will update as notes are added or removed.
  .get((request, response) => {
    response.json(db);
  })

  // will add on new info to the db.json file
  .post((request, response) => {
    let json = path.join(__dirname, "/db/db.json");
    let notes = request.body;

    let max = 99;
    for (i = 0; i < db.length; i++) {
      let singleNote = db[i];

      if (singleNote.id > max) {
        max = singleNote.id;
      }
    }
    notes.id = max + 1;
    db.push(notes);

    fs.writeFile(json, JSON.stringify(db), (err) => {
      if (err) {
        return console.log(err);
      }
    });
    response.json(notes);
  });

link.delete("/api/notes/:id",  (request, response) => {
  let json = path.join(__dirname, "/db/db.json");
  for (let i = 0; i < db.length; i++) {
    if (db[i].id == request.params.id) {
      db.splice(i, 1);
      break;
    }
  }

  fs.writeFileSync(json, JSON.stringify(db), (err) => {
    if (err) {
      return console.log(err);
    }
  });
  response.json(db);
});

//Startup server when called.
link.listen(PORT, () => {
  console.log("The server " + PORT + " has been intialized!");
});
