const express = require("express");
const route = express.Router();
const lookup = require("binlookup")();

route.get("/binchecker", (req, res) => {
  res.render("binchecker.ejs", {
    page: "binchecker",
  });
});

route.post("/binchecker", async (req, res) => {
  try {
    await lookup(req.body.bin)
      .then((data) => {
        res.status(200).send(data);
      })
      .catch((err) => {
        res.status(429).send(err);
      });
  } catch (err) {
    console.log("Yes I am wrong");
  }
});

module.exports = route;
