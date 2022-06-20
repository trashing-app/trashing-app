const { Collector } = require("../models");

class CollectorController {
  static async getCollectors(req, res, next) {
    try {
      const collectors = await Collector.findAll();
      res.status(200).json(collectors);
    } catch (err) {
      next(err);
    }
  }

  static async addCollectors(req, res, next) {
    try {
      const { username, email, password, phoneNumber, address } = req.body;
      const newCollector = await Collector.create({
        username,
        email,
        password,
        phoneNumber,
        address,
      });
      res.status(201).json(newCollector);
    } catch (err) {
      next(err);
    }
  }

  static async updateCollector(req, res, next) {
    try {
      const { id } = req.params;
      const { username, email, password, phoneNumber, address } = req.body;
      const updated = await Collector.update(
        {
          where: {
            id,
          },
        },
        {
          username,
          email,
          password,
          phoneNumber,
          address,
        }
      );
      res.status(201).json(updated);
    } catch (err) {
      next(err);
    }
  }

  static async updateLocation(req, res, next) {
    try {
      const { id } = req.params;
      // const { location } = req.body;
      const updated = await User.update(
        {
          location: Sequelize.fn(
            "ST_GeomFromText",
            "POINT(107.5925576773082 -6.940669415817259)"
          ),
        },
        {
          where: {
            id,
          },
        }
      );
      res.status(201).json(updated);
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
      res.status(201).json(deleted);
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

  static async updateLocation(req, res, next) {
    try {
      const { id } = req.params;
      const { longitude, latitude } = req.body;
      const updated = await Collector.update(
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
      res.status(201).json(updated);
    } catch (err) {
      next(err);
    }
  }
}

module.exports = CollectorController;
