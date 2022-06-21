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
      const { data } = req.body;
      console.log(data);
      const orderItems = await OrderItem.findAll({
        include: ['Category'],
        where: {
          orderId,
        },
      });

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
      console.log(result);
      const bulkOrderItem = await OrderItem.bulkCreate(result, {
        updateOnDuplicate: ['price', 'weight'],
      });
      res.status(200).json(bulkOrderItem);
    } catch (err) {
      console.log(err);
      next(err);
    }
  }
}

module.exports = OrderItemController;
