const express = require("express");
const path = require("path");
const dbjson = require("./db/db.json");
const uuid = require("uuid");
console.log(uuid.v4());
// id: uuid.v4();

const app = express();
const PORT = process.env.PORT || 3000;

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
  return res.json(dbjson);
});
app.post("/api/notes", (req, res) => {
  let note = req.body;
  id = uuid.v4();

  dbjson.push(req.body);
  res.json(true);
});
app.delete("/api/notes/:id", (req, res) => {
  dbjson.delete(req.body);

  dbjson.length = 0;

  res.json({ ok: true });
});

//
app.put("/api/notes", (req, res) => {
  dbjson.save(req.noteList);
});
// route for updating a note that the user clicked on
// var newNote = req.body;

// var readonly = req.params.notes;
// for (var i = 0; i < noteList.length; i++) {
//   if (readonly === notes[i]) {
//     return res.json(notes[i]);
//   }
// }
//

// Listener
// ===========================================================
app.listen(PORT, () => {
  console.log("App listening on PORT " + PORT);
});
