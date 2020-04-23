// importing internal node packages
const path = require("path");
const express = require("express");
const app = express();

// importing external packages
const CFonts = require("cfonts");

// importing local files
const apiRoutes = require("./routes/api");
const htmlRoutes = require("./routes/html");

// parser middlewear
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// static folder
app.use(express.static(path.join(__dirname, "public")));

//  api routes
app.use("/api", apiRoutes);
app.use(htmlRoutes);

const PORT = process.env.PORT || 3000;

// Listener
app.listen(PORT, () => {
  console.log("App listening on PORT " + PORT);
});

// cfont
CFonts.say("Welcome to the pink side! ", {
  font: "chrome",
  align: "center",
  colors: ["magenta", "magenta", "magenta"],
  background: "transparent",
  letterSpacing: 1,
  lineHeight: 1,
  space: true,
  maxLength: "0",
  gradient: true,
  independentGradient: false,
  transitionGradient: false,
  env: "node",
});
