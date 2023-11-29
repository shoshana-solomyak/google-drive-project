var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

router.get("/:username", function (req, res, next) {
  const user = req.params.username;
  res.send(JSON.stringify(req.params.username));
});

module.exports = router;
