const express = require("express");
const route = express.Router();

route.get("/gencard", (req, res) => {
  res.render("generatecard.ejs", {
    page: "gencard",
  });
});

module.exports = route;
