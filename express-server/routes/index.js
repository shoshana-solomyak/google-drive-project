var express = require("express");
var router = express.Router();
const users = [
  { name: "talya", password: 123456 },
  { name: "shoshana", password: 123456 },
  { name: "Bret", password: "hildegard.org" },
];

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

router.get("/:username", function (req, res, next) {
  const user = req.params.username;
  res.send(JSON.stringify(req.params.username));
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
