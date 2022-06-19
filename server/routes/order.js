const express = require("express");
const router = express.Router();
const OrderController = require("../controllers/orderController");

router.get("/", OrderController.getOrders);
router.post("/", OrderController.addOrder);
router.put("/complete/:id", OrderController.completeOrder);
router.put("/approve/:id", OrderController.approveOrder);
router.put("/pay/:id", OrderController.payOrder);
router.delete("/:id", OrderController.deleteOrder);
router.get("/:id", OrderController.getOrderById);

module.exports = router;
