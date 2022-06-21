const express = require("express");
const router = express.Router();
const OrderItemController = require("../controllers/orderItemsController");

router.put("/:orderId", OrderItemController.updateOrderItems);
router.get("/:orderId", OrderItemController.getAllOrderItems);

module.exports = router;
