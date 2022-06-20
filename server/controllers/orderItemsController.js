const { OrderItem } = require("../models");

class OrderItemController {
  static async getAllOrderItems(req, res, next) {
    try {
      const { orderId } = req.params;
      const orderItems = await OrderItem.findAll({
        include: ["Category"],
        where: {
          orderId,
        },
      });
      res.status(200).json(orderItems);
    } catch (err) {
      console.log(err);
    }
  }

  static async updateOrderItems(req, res, next) {
    try {
      const { orderId } = req.params;
      const { orderItems } = req.body;

      orderItems.forEach((e) => {
        e.orderId = orderId;
      });

      const bulkOrderItem = await OrderItem.bulkCreate(orderItems, {
        updateOnDuplicate: ["price", "weight"],
      });
      res.status(200).json(bulkOrderItem);
    } catch (err) {
      next(err);
    }
  }
}

module.exports = OrderItemController;
