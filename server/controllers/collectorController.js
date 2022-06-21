
const { Collector, Sequelize } = require("../models");


class CollectorController {
  static async getCollectors(req, res, next) {
    try {
      const collectors = await Collector.findAll();
      res.status(200).json(collectors);
    } catch (err) {
      next(err);
    }
  }

  static async updateCollector(req, res, next) {
    try {
      const { id } = req.params;
      const { username, email, password, phoneNumber, address } = req.body;
      const [updated] = await Collector.update(
        {
          username,
          email,
          password,
          phoneNumber,
          address,
        },
        {
          where: {
            id,
          },
        },
      );
      if(!updated) throw new Error("Not found")
      res.status(200).json({message:"Collector has been updated"});
    } catch (err) {
      next(err);
    }
  }

  static async updateLocation(req, res, next) {
    try {
      const { id } = req.params;
      const { longitude, latitude } = req.body;
      const [updated] = await Collector.update(
        {
          location: Sequelize.fn(
            "ST_GeomFromText",
            `POINT(${longitude} ${latitude})`
          ),
        },
        {
          where: {
            id,
          },
        }
      );
      if(!updated) throw new Error("Not found")
      res.status(200).json({message:"Location updated"});
    } catch (err) {
      next(err);
    }
  }

  static async deleteCollector(req, res, next) {
    try {
      const { id } = req.params;
      const deleted = await Collector.destroy({
        where: {
          id,
        },
      });
      if(!deleted) throw new Error("Not found")
      res.status(200).json({message:"Collector deleted"});
    } catch (err) {
      next(err);
    }
  }

  static async getCollectorById(req, res, next) {
    try {
      const id = +req.params.id;
      const collector = await Collector.findOne({
        where: {
          id,
        },
        attributes: {
          exclude: ["password", "createdAt", "updatedAt"],
        },
      });
      if (!collector) throw new Error("Not found");
      res.status(200).json(collector);
    } catch (err) {
      next(err);
    }
  }

  static async getCollectorLocation(req, res, next) {
    try {
      const id = +req.params.id;
      const collector = await Collector.findOne({
        where: {
          id,
        },
        attributes: {
          exclude: [
            "password",
            "createdAt",
            "updatedAt",
            "username",
            "email",
            "address",
            "phoneNumber",
          ],
        },
      });
      if (!collector) throw new Error("Not found");
      res.status(200).json(collector);
    } catch (err) {
      next(err);
    }
  }
}

module.exports = CollectorController;
