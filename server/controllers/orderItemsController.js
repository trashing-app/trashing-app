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
      if(!orderItems.length) throw new Error("Not found")
      res.status(200).json(orderItems);
    } catch (err) {
      next(err)
    }
  }

  static async updateOrderItems(req, res, next) {
    try {
      const { orderId } = req.params;
      const { data } = req.body;

      const orderItems = await OrderItem.findAll({
        include: ['Category'],
        where: {
          orderId,
        },
      });

      if(!orderItems.length || !orderItems) throw new Error("Not found")

      for (const key in data) {
        orderItems.forEach((e) => {
          if (e.categoryId == key) {
            e.weight = data[key];
            e.price = +data[key] * +e.Category.basePrice;
            delete e.dataValues.Category;
          }
        });
      }

      const result = orderItems.map((el) => {
        return el.dataValues;
      });
      const bulkOrderItem = await OrderItem.bulkCreate(result, {
        updateOnDuplicate: ['price', 'weight'],
      });
      if(bulkOrderItem.length === 0 || !bulkOrderItem) throw new Error()
      res.status(200).json(bulkOrderItem);
    } catch (err) {
      next(err);
    }
  }
}

module.exports = OrderItemController;
