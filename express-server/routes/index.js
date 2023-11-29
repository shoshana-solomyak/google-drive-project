var express = require("express");
var router = express.Router();
const fs = require("node:fs");
const path = require("node:path");

const users = [
  { name: "talya", password: 123456 },
  { name: "shoshana", password: 123456 },
];

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

router.get("/:username", function (req, res, next) {
  const username = req.params.username;
  const userpath = `./public/files/${username}`;
  fs.readdir(userpath, (err, data) => {
    if (err) return res.status(404).send(`${username} not found`).end();

    let answer = [];
    data.map((name) => {
      fs.stat(path.join(userpath, name), (err, stat) => {
        if (err) return res.status(404).send(`${name} stat went wrong`).end();
        if (stat.isDirectory()) {
          answer.push({ isDir: true, size: stat.size });
        } else {
          answer.push({ isDir: false, size: stat.size });
        }
        if (answer.length === data.length) {
          for (let i in data) {
            answer[i].name = data[i];
          }
          res.send(JSON.stringify(answer)).end();
        }
      });
    });
  });
});

module.exports = router;
