const express = require("express");
const router = express.Router();
const user = require("./user");
const collector = require("./collector");
const order = require("./order");
const publicUser = require("./publicUser");
const publicCollector = require("./publicCollector");
const category = require('./category')
const { errorHandler } = require("../middlewares/errorHandler");
const { isLoggedIn } = require("../middlewares/isLoggedIn");

router.get("/", (req, res) => {
  res.send("Trash");
});
router.use("/users", user);
router.use("/categories", category);
router.use("/collectors", collector);
router.use("/pub/users", publicUser);
router.use("/pub/collectors", publicCollector);
router.use("/orders", isLoggedIn, order);
router.use(errorHandler);
module.exports = router;
