const express = require("express");
const router = express.Router();
const id = require("uuid");
const dbjson = require("../db/db.json");
const fs = require("fs");

// data routes
router.get("/notes", (req, res) => {
  res.json(dbjson);
});

router.post("/notes", (req, res) => {
  let newNote = req.body;
  newNote.id = `${id}`;
  dbjson.push(newNote);

  writeFileSync("./db/db.json", JSON.stringify(newNote)).then(() => {
    res.json(newNote);
  });
});

router.delete("/notes/:id", (req, res) => {
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
