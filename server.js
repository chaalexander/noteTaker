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
  let id = uuid.v4;
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
  dbjson.delete(req.body);

  dbjson.length = 0;

  res.json({ ok: true });
});

// Listener
// ===========================================================
app.listen(PORT, () => {
  console.log("App listening on PORT " + PORT);
});
