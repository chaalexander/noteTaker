// importing internal node
const express = require("express");
const fs = require("fs");
const util = require("util");

// creating the router const
const router = express.Router();

// importing external packages
const uuid = require("uuid");

// importing local files
let dbjson = require("../db/db.json");

const writeFileSync = util.promisify(fs.writeFile);

// data routes
router.get("/notes", (req, res) => {
  res.json(dbjson);
});

router.post("/notes", async (req, res) => {
  let id = uuid.v4();
  let newNote = req.body;
  newNote.id = `${id}`;
  dbjson.push(newNote);

  try {
    await writeFileSync("./db/db.json", JSON.stringify(dbjson));
    res.json(newNote);
  } catch (error) {
    res.json(error);
  }
});

router.delete("/notes/:id", async (req, res) => {
  const found = dbjson.some((dbjson) => dbjson.id === req.params.id);
  console.log(req.params.id, found);

  if (found) {
    const filterNotes = dbjson.filter((dbjson) => dbjson.id !== req.params.id);
    dbjson = filterNotes;
    try {
      await writeFileSync("./db/db.json", JSON.stringify(dbjson));
      res.json(newNote);
    } catch (error) {
      res.json(error);
    }
  } else {
    res.status(400).json({ msg: `No Note with the id of ${req.params.id}` });
  }
});

module.exports = router;
