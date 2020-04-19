// node packages
const path = require("path");
const fs = require("fs");
const util = require("util");

// npm packages
const express = require("express");
const uuid = require("uuid");

// importing local files
const dbjson = require("./db/db.json");

const readFileAsync = util.promisify(fs.readFile);
const writeFileSync = util.promisify(fs.writeFile);

// console.log(uuid.v4());
// id: uuid.v4();

// express
const app = express();
const PORT = process.env.PORT || 3000;

// express handle
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

let notes = [];
let id = uuid.v4();

// Routes
// html routes
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "notes.html"));
});

// data routes
app.get("/api/notes", (req, res) => {
  readFileAsync("./db/db.json", "utf8").then((data) => {
    const notesJson = JSON.parse(data);
    console.log(notesJson);
    res.json(notesJson);
  });
});

app.post("/api/notes", (req, res) => {
  let newNote = req.body;

  newNote.id = `${id}`;
  readFileAsync("./db/db.json", "utf8").then((data) => {
    const notesJson = JSON.parse(data);
    notesJson.push(newNote);

    writeFileSync("./db/db.json", JSON.stringify(notesJson)).then(() => {
      res.json(newNote);
    });
  });
});

app.delete("/api/notes/:id", (req, res) => {
  // dbjson.splice(valueOf(id));
  // dbjson.delete(req.body);
  dbjson.length = 0;
  res.json({ ok: true });

  fs.readFile("db.json", function read(err) {
    if (err) {
      throw err;
    }

    lastIndex = (function () {
      for (var i = dbjson.length - 1; i > -1; i--)
        if (dbjson[i].match(id)) return i;
    })();

    delete dbjson[lastIndex];

    const found = dbjson.some(
      (dbjson) => dbjson.id === parseInt(req.params.id)
    );
    if (found) {
      res.json({
        msg: "Note Deleted",
        dbjson: dbjson.filter(
          (dbjson) => dbjson.id !== parseInt(req.params.id)
        ),
      });
    } 
    else {
      res.status(400).json({ msg: `No Note with the id of ${req.params.id}` });
    }
  });
});

// Listener
// ===========================================================
app.listen(PORT, () => {
  console.log("App listening on PORT " + PORT);
});
