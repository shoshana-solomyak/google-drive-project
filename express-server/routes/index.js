var express = require("express");
var router = express.Router();
const fs = require("node:fs");
const path = require("node:path");

const users = [
  { id: 1, name: "talya", password: 123456 },
  { id: 2, name: "shoshana", password: 123456 },
  { id: 3, name: "Bret", password: "hildegard.org" },
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
  console.log("in server");
  const filepath = `public/files/${req.params.username}/${req.params.filepath}`;
  res.sendFile(path.join(path.normalize(path.join(__dirname, "..")), filepath));
});
router.get("/:username/:foldername/content/:filepath", (req, res, next) => {
  console.log("in server");
  const filepath = `public/files/${req.params.username}/${req.params.foldername}/${req.params.filepath}`;
  res.sendFile(path.join(path.normalize(path.join(__dirname, "..")), filepath));
});

router.get("/:username/:foldername/content/:filepath", (req, res, next) => {
  console.log("in server");
  const filepath = `public/files/${req.params.username}/${req.params.foldername}/${req.params.filepath}`;
  res.sendFile(path.join(path.normalize(path.join(__dirname, "..")), filepath));
});

router.post("/users", function (req, res, next) {
  let input = req.body.inputs;
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

router.post("/:username/:file/:destination", (req, res, next) => {
  const action = req.query.action;

  console.log("in copy server");
  const source = req.params.file;
  const destination = req.params.destination;
  const filepath = `./public/files/${req.params.username}/${source}`;
  const destinationpath = `./public/files/${req.params.username}/${destination}/${source}`;

  if (!fs.existsSync(destinationpath)) {
    fs.copyFile(filepath, destinationpath, (err) => {
      if (err) {
        console.log(
          `something went wrong trying to copy ${source} into ${destination}`
        );
        return res
          .status(404)
          .send(
            `something went wrong trying to copy ${source} into ${destination}`
          );
      }
      res.send("file copied succesfully");
    });
  } else {
    console.log(`${source} already exists in ${destination}`);
    res.status(400).send(`${source} already exists in ${destination}`);
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
router.delete("/:username/:foldername/:item", function (req, res, next) {
  const { username, item, foldername } = req.params;
  const isFolder = req.query.isFolder === "true";
  const filePath = `./public/files/${username}/${foldername}/${item}`;
  console.log("we got here: ", filePath);
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
// router.get("/:username/:foldername");
router.put("/:username/:item", function (req, res) {
  const { username, item } = req.params;
  const newItem = req.body.name;
  console.log(" newItem: ", newItem);
  let oldPath = `./public/files/${username}/${item}`;
  let newPath = `./public/files/${username}/${newItem}`;

  fs.rename(oldPath, newPath, (err) => {
    if (err) {
      console.error("Error renaming file:", err);
      res.status(500).send("Error renaming file");
      return;
    }
    console.log("File renamed successfully!");
    res.status(200).send("File renamed successfully");
  });
});

router.put("/:username/:foldername/:item", function (req, res) {
  const { username, item, foldername } = req.params;
  const newItem = req.body.name;
  console.log(" newItem: ", newItem);
  let oldPath = `./public/files/${username}/${foldername}/${item}`;
  let newPath = `./public/files/${username}/${foldername}/${newItem}`;

  fs.rename(oldPath, newPath, (err) => {
    if (err) {
      console.error("Error renaming file:", err);
      res.status(500).send("Error renaming file");
      return;
    }
    console.log("File renamed successfully!");
    res.status(200).send("File renamed successfully");
  });
});

module.exports = router;
