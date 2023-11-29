var express = require("express");
var router = express.Router();
const fs = require("node:fs");
const path = require("node:path");

const users = [
  { id: 1, name: "talya", password: 123456 },
  { id: 2, name: "shoshana", password: 123456 },
  { id: 3, name: "Bret", password: "hildegard.org" },
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

router.get("/:username/:filepath", (req, res, next) => {
  const filepath = `public/files/${req.params.username}/${req.params.filepath}`;
  res.sendFile(path.join(path.normalize(path.join(__dirname, "..")), filepath));
});

router.post("/users", function (req, res, next) {
  let input = req.body.inputs;
  console.log("input: ", input);
  console.log("users: ", users);
  const user = users.find((u) => {
    console.log(
      "u.password.toString() == input.password: ",
      u.password.toString() == input.password
    );
    return u.name === input.username && u.password.toString() == input.password;
  });

  console.log("user: ", user);
  if (user) {
    console.log("user: ", user);

    res.status(200).send(user).end();
  } else {
    res.status(400).send("incorrect username or password").end();
  }
});
router.delete("/:username/:item", function (req, res, next) {
  const { username, item } = req.params;
  const isFolder = req.query.isFolder === "true";
  const filePath = `./public/files/${username}/${item}`;
  console.log("filePath: ", filePath);
  if (!isFolder) {
    fs.rm(filePath, (err) => {
      if (err) {
        console.error(err);
        res.status(500).json({ message: "Failed to delete item." });
      } else {
        res.status(200).json({ message: "Item deleted successfully." });
      }
    });
  } else {
    fs.rmdir(filePath, (err) => {
      console.log("filePath: ", filePath);
      if (err) {
        console.error(err);
        res.status(500).json({ message: "Failed to delete item." });
      } else {
        res.status(200).json({ message: "Item deleted successfully." });
      }
    });
  }
});

module.exports = router;
