const path = require("path");
const express = require("express");
const app = express();

// parser middlewear
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// static folder
app.use(express.static(path.join(__dirname, "public")));

//  api routes
app.use("/api/api", require("./routes/api"));

// Routes
// html routes
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "notes.html"));
});

const PORT = process.env.PORT || 3000;
// Listener

app.listen(PORT, () => {
  console.log("App listening on PORT " + PORT);
});
