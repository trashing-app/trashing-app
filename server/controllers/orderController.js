const { Order, OrderItem, History, sequelize, User } = require("../models");
const { Sequelize } = require("sequelize");
class OrderController {
  static async getOrders(req, res, next) {
    try {
      const orders = await Order.findAll({
        include: [
          {
            model: User,
          },
          {
            model: OrderItem,
            include: ["Category"],
          },
        ],
        where: {
          orderStatus: "Not Completed",
          approvalStatus: "Not Approved",
        },
      });
      res.status(200).json(orders);
    } catch (err) {
      next(err);
    }
  }

  static async findOrderByRadius(req, res) {
    try {
      // distance on meter unit
      const distance = req.query.distance || 2000;
      const long = req.query.long || "-6.9439994342171225";
      const lat = req.query.lat || "107.5904275402039";
      const result = await sequelize.query(
        `select
        id,
        location
      from
        "Orders"
      where
        ST_DWithin(location,
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
      next(error)
    }
  }

  static async addOrder(req, res, next) {
    try {
      const { orderItems, longitude, latitude } = req.body;

      const location = Sequelize.fn(
        "ST_GeomFromText",
        `POINT(${JSON.parse(latitude)} ${JSON.parse(longitude)})`
      );

      const userId = req.pass.id;
      const newOrder = await Order.create({
        userId,
        orderDate: new Date(),
        userChatId: userId + `${Date.now()}`,
        location,
      });

      orderItems.forEach((el) => {
        el.orderId = newOrder.id;
      });

      const created = await OrderItem.bulkCreate(orderItems);
      if(!created || !created.length) throw "error"
      res.status(201).json(newOrder);
    } catch (err) {
      next(err);
    }
  }

  static async completeOrder(req, res, next) {
    try {
      const transaction = await sequelize.transaction()
      const { id } = req.params;

      const currentOrder = await Order.findOne({
        where: {
          id
        },
        include:["OrderItems"]
      }, { transaction })

      let total = 0
      const { userId, collectorId } = currentOrder
      currentOrder.OrderItems.forEach(el => total += el.price)

      if(!currentOrder) throw new Error("Not found")

      const [completed] = await Order.update(
        {
          orderStatus: "Completed",
        },
        {
          where: {
            id,
          },
        },
      { transaction });
      if(!completed) throw new Error('Not found')

      const writtenHistory = await History.create({
        userId, 
        collectorId,
        orderId:id,
        description: `Rp${total.toLocaleString('id')},00 obtained`
      }, { transaction })
      if(!writtenHistory) throw new Error('Error')
      await transaction.commit();
      res.status(200).json({ message:"Order completed" });
    } catch (err) {
      await transaction.rollback()
      next(err);
    }
  }

  static async approveOrder(req, res, next) {
    try {
      const { id } = req.params;
      // const { pickupDate } = req.body;
      const pickupDate = new Date();
      const collectorId = req.pass.id;
      const [ approved ] = await Order.update(
        {
          approvalStatus: "Approved",
          pickupDate,
          collectorId,
          collectorChatId: collectorId + `${Date.now()}`,
        },
        {
          where: {
            id,
          },
        }
      );
      if(!approved) throw new Error("Not found")
      res.status(200).json({message:"Order approved"});
    } catch (err) {
      next(err);
    }
  }

  static async payOrder(req, res, next) {
    try {
      const { id } = req.params;
      const [paid] = await Order.update(
        {
          paymentStatus: "Paid",
        },
        {
          where: {
            id,
          },
        }
      );
      if(!paid) throw new Error("Not found")
      res.status(200).json({message:"Order paid"});
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

  static async getOrderById(req, res, next) {
    try {
      const id = +req.params.id;
      const foundOrder = await Order.findOne({
        where: {
          id,
        },
        include: ["User", "Collector"],
      });
      if (!foundOrder) throw new Error("Not found");
      res.status(200).json(foundOrder);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = OrderController;
