var express = require("express");
const { error } = require("node:console");
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
router.get("/:username/:foldername/content/:filepath", (req, res, next) => {
  const filepath = `public/files/${req.params.username}/${req.params.foldername}/${req.params.filepath}`;
  res.sendFile(path.join(path.normalize(path.join(__dirname, "..")), filepath));
});

router.get("/:username/:foldername/content/:filepath", (req, res, next) => {
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

  if (user) {
    res.status(200).send(user).end();
  } else {
    res.status(400).send("incorrect username or password").end();
  }
});

router.post("/:username/copy/:file/:destination", (req, res, next) => {
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
    res.status(400).send(`${source} already exists in ${destination}`);
  }
});

router.post("/:username/move/:file/:destination", (req, res, next) => {
  const source = req.params.file;
  const destination = req.params.destination;
  const filepath = `./public/files/${req.params.username}/${source}`;
  const destinationpath = `./public/files/${req.params.username}/${destination}/${source}`;
  if (!fs.existsSync(destinationpath)) {
    fs.rename(filepath, destinationpath, (err) => {
      if (err) {
        res.status(500).send("Error moving file");
        return;
      }

      res.status(200).send("File moved successfully");
    });
  } else {
    res.status(400).send("file already exists");
  }
});

router.delete("/:username/:item", function (req, res, next) {
  const { username, item } = req.params;
  const isFolder = req.query.isFolder === "true";
  const filePath = `./public/files/${username}/${item}`;

  if (!isFolder) {
    fs.rm(filePath, (err) => {
      if (err) {
        res.status(500).json({ message: "Failed to delete item." });
      } else {
        res.status(200).json({ message: "Item deleted successfully." });
      }
    });
  } else {
    fs.readdir(filePath, (err, files) => {
      if (err) {
        res.status(500).json({ message: "Failed to read directory." });
      } else {
        if (files.length > 0) {
          res.status(400).json({ message: "Folder is not empty." });
        } else {
          fs.rmdir(filePath, (err) => {
            if (err) {
              res.status(500).json({ message: "Failed to delete folder." });
            } else {
              res.status(200).json({ message: "Folder deleted successfully." });
            }
          });
        }
      }
    });
  }
});

router.delete("/:username/:foldername/:item", function (req, res, next) {
  const { username, item, foldername } = req.params;
  const isFolder = req.query.isFolder === "true";
  const filePath = `./public/files/${username}/${foldername}/${item}`;

  if (!isFolder) {
    fs.rm(filePath, (err) => {
      if (err) {
        res.status(500).json({ message: "Failed to delete item." });
      } else {
        res.status(200).json({ message: "Item deleted successfully." });
      }
    });
  } else {
    fs.readdir(filePath, (err, files) => {
      if (err) {
        res.status(500).json({ message: "Failed to read directory." });
      } else {
        if (files.length > 0) {
          res.status(400).json({ message: "Folder is not empty." });
        } else {
          fs.rmdir(filePath, (err) => {
            if (err) {
              res.status(500).json({ message: "Failed to delete folder." });
            } else {
              res.status(200).json({ message: "Folder deleted successfully." });
            }
          });
        }
      }
    });
  }
});
router.put("/:username/:item", function (req, res) {
  const { username, item } = req.params;
  const newItem = req.body.name;

  let oldPath = `./public/files/${username}/${item}`;
  let newPath = `./public/files/${username}/${newItem}`;

  fs.rename(oldPath, newPath, (err) => {
    if (err) {
      res.status(500).send("Error renaming file");
      return;
    }

    res.status(200).send("File renamed successfully");
  });
});

router.put("/:username/:foldername/:item", function (req, res) {
  const { username, item, foldername } = req.params;
  const newItem = req.body.name;

  let oldPath = `./public/files/${username}/${foldername}/${item}`;
  let newPath = `./public/files/${username}/${foldername}/${newItem}`;

  fs.rename(oldPath, newPath, (err) => {
    if (err) {
      res.status(500).send("Error renaming file");
      return;
    }

    res.status(200).send("File renamed successfully");
  });
});

module.exports = router;
