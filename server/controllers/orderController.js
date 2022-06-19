const { Order, OrderItem } = require("../models");
const { Sequelize } = require("sequelize");
class OrderController {
  static async getOrders(req, res, next) {
    try {
      const orders = await Order.findAll();
      res.status(200).json(orders);
    } catch (err) {
      next(err);
    }
  }

  static async addOrder(req, res, next) {
    try {
      // const { weight, categoryId, description, price } = req.body;
      const { latitude, longitude } = req.body;
      const userId = req.pass.id;

      const newOrder = await Order.create({
        userId,
        orderDate: new Date(),
        orderLocation: Sequelize.fn(
          "ST_GeomFromText",
          `POINT(${latitude} ${longitude})`
        ),
      });

      // const newOrderItem = await OrderItem.create({
      //   weight,
      //   categoryId,
      //   description,
      //   orderId: newOrder.id,
      //   price,
      // });

      res.status(201).json(newOrder);
    } catch (err) {
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
    } catch (err) {
      next(err);
    }
  }

  static async approveOrder(req, res, next) {
    try {
      const { id } = req.params;
      const { pickupDate } = req.body;
      const collectorId = req.pass.id;
      const approved = await Order.update(
        {
          approvalStatus: "Approved",
          pickupDate,
          collectorId,
        },
        {
          where: {
            id,
          },
        }
      );
      res.status(201).json(approved);
    } catch (err) {
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
    } catch (err) {
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
    } catch (err) {
      next(err);
    }
  }
}

module.exports = OrderController;
