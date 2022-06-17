const express = require("express");
const router = express.Router();
const UserController = require("../controllers/userController");

router.get("/", UserController.getUsers);
router.post("/", UserController.addUser);
router.put("/:id", UserController.updateUser);
router.put("/:id", UserController.topupBalance);
router.delete("/:id", UserController.deleteUser);

module.exports = router;
