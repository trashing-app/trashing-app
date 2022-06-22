const express = require("express");
const router = express.Router();
const publicUserController = require("../controllers/publicUserController");

router.post("/login", publicUserController.login);
router.post("/register", publicUserController.register);
router.patch("/registerDevice", publicUserController.registerDevice);

module.exports = router;
