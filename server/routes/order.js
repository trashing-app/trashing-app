const express = require("express");
const router = express.Router();
const OrderController = require("../controllers/orderController");

router.get("/", OrderController.getOrders);
router.post("/", OrderController.addOrder);
router.put("/:id", OrderController.completeOrder);
router.put("/:id", OrderController.approveOrder);
router.put("/:id", OrderController.payOrder);
router.delete("/:id", OrderController.deleteOrder);

module.exports = router;
