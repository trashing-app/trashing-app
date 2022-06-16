const express = require("express");
const router = express.Router();
const user = require("./user");
const collector = require("./collector");
const { errorHandler } = require("../middlewares/errorHandler");

router.get("/", (req, res) => {
  res.send("Trash");
});
router.get("/users", user);
router.get("/collectors", collector);
router.use(errorHandler);
module.exports = router;
