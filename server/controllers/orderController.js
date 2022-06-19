const { Order, OrderItem, sequelize } = require("../models");
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

  static async findOrderByRadius(req, res) {
    try {
      //Masih belum bisa digunakan
      // distance on meter unit
      const distance = 1000;
      const long = "104.1793021";
      const lat = "-4.1404221";

      const result = await sequelize.query(
        `select
        id,
        orderLocation
      from
        "Orders"
      where
        ST_DWithin(orderLocation,
        ST_MakePoint(:lat,
        :long),
        :distance,
      true) = true;`,
        {
          replacements: {
            distance: +distance,
            long: parseFloat(long),
            lat: parseFloat(lat),
          },
          logging: console.log,
          plain: false,
          raw: false,
          type: sequelize.QueryTypes.SELECT,
        }
      );
      res.status(200).json(result);
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  }

  static async addOrder(req, res, next) {
    try {
      // const { weight, categoryId, description, price } = req.body;
      const { latitude, longitude } = req.body;
      const userId = req.pass.id;

      // console.log(new Date());
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
