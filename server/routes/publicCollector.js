const express = require("express");
const router = express.Router();
const publicCollectorController = require("../controllers/publicCollectorController");

router.post("/login", publicCollectorController.login);
router.post("/register", publicCollectorController.register);
router.patch("/registerDevice", publicCollectorController.registerDevice);

module.exports = router;
