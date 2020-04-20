const express = require("express");
const router = express.Router();
const id = require("uuid");
const dbjson = require("../db/db.json");
const fs = require("fs");

// data routes
router.get("/", (req, res) => {
  readFileAsync("../db/db.json", "utf8").then((data) => {
    const notesJson = JSON.parse(data);
    console.log(notesJson);
    res.json(notesJson);
  });
});

router.post("/", (req, res) => {
  let newNote = req.body;

  newNote.id = `${id}`;
  readFileAsync("../db/db.json", "utf8").then((data) => {
    const notesJson = JSON.parse(data);
    notesJson.push(newNote);

    writeFileSync("./db/db.json", JSON.stringify(notesJson)).then(() => {
      res.json(newNote);
    });
  });
});

router.delete("//:id", (req, res) => {
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
    } else {
      res.status(400).json({ msg: `No Note with the id of ${req.params.id}` });
    }
  });
});

module.exports = router;
