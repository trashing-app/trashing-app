const { Order, OrderItem } = require("../models");

class OrderController {
  static async getOrders(req, res, next) {
    try {
      const orders = await Order.findAll();
      res.status(200).json(orders);
    } catch (error) {
      next(err);
    }
  }

  static async addOrder(req, res, next) {
    try {
      const { weight, categoryId, description, price } = req.body;
      const userId = req.pass.id;
      const { collectorId, pickupDate } = req.body;
      const newOrder = await Order.create({
        userId,
        orderDate: new Date(),
        pickupDate,
        collectorId,
      });

      const newOrderItem = await OrderItem.create({
        weight,
        categoryId,
        description,
        orderId: newOrder.id,
        price,
      });

      res.status(201).json(newOrder);
    } catch (error) {
      next(err);
    }
  }

  static async completeOrder(req, res, next) {
    try {
      const { id } = req.params;
      const completed = await Order.update(
        {
          where: {
            id,
          },
        },
        {
          orderStatus: "Completed",
        }
      );
      res.status(201).json(completed);
    } catch (error) {
      next(err);
    }
  }

  static async approveOrder(req, res, next) {
    try {
      const { id } = req.params;
      const approved = await Order.update(
        {
          where: {
            id,
          },
        },
        {
          approvalStatus: "Approved",
        }
      );
      res.status(201).json(approved);
    } catch (error) {
      next(err);
    }
  }

  static async payOrder(req, res, next) {
    try {
      const { id } = req.params;
      const paid = await Order.update(
        {
          where: {
            id,
          },
        },
        {
          paymentStatus: "Paid",
        }
      );
      res.status(201).json(paid);
    } catch (error) {
      next(err);
    }
  }

  static async deleteOrder(req, res, next) {
    try {
      const { id } = req.params;
      const deleted = await Order.destroy({
        where: {
          id,
        },
      });
      res.status(200).json(deleted);
    } catch (error) {
      next(err);
    }
  }
}

module.exports = OrderController;
