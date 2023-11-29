var express = require("express");
var router = express.Router();
const fs = require("node:fs");
const path = require("node:path");

const users = [
  { name: "talya", password: 123456 },
  { name: "shoshana", password: 123456 },
  { name: "Bret", password: "hildegard.org" },
];

function getDirectory(res, pathname) {
  fs.readdir(pathname, (err, data) => {
    if (err) return res.status(404).send(`user not found`).end();

    if (data.length === 0) {
      return res.send(JSON.stringify(data)).end();
    }
    let answer = [];
    data.map((name) => {
      fs.stat(path.join(pathname, name), (err, stat) => {
        if (err) return res.status(404).send(`${name} stat went wrong`).end();
        if (stat.isDirectory()) {
          answer.push({
            isDir: true,
            size: stat.size,
            birthday: stat.birthtime,
          });
        } else {
          answer.push({
            isDir: false,
            size: stat.size,
            birthday: stat.birthtime,
          });
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
}

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

router.get("/:username", function (req, res, next) {
  const username = req.params.username;
  const userpath = `./public/files/${username}`;

  getDirectory(res, userpath);
});

router.get("/:username/:foldername", (req, res, next) => {
  const pathname = `./public/files/${req.params.username}/${req.params.foldername}`;
  getDirectory(res, pathname);
});

router.get("/:username/content/:filepath", (req, res, next) => {
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

module.exports = router;
