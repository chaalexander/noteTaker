const path = require("path");
const express = require("express");
const app = express();
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
