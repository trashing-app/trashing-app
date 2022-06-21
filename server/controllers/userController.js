const { User } = require("../models");
const { Sequelize } = require("sequelize");
class UserController {
  static async getUsers(req, res, next) {
    try {
      const users = await User.findAll();
      res.status(200).json(users);
    } catch (err) {
      next(err);
    }
  }

  static async updateUser(req, res, next) {
    try {
      const { id } = req.params;
      const { username, email, password, phoneNumber, address } = req.body;
      const [updated] = await User.update(
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
        }
      );
      if(!updated) throw new Error("Not found")
      res.status(200).json({message: "User has been updated"});
    } catch (err) {
      next(err);
    }
  }

  static async reduceBalance(req, res, next) {
    try {
      const { id } = req.params;
      const { balance } = req.body;
      const reduced = await User.decrement("balance",
        {
          where: {
            id,
          },
          by: balance
        }
      );
      res.status(200).json({message:`The balance reduced ${balance}`});
    } catch (err) {
      next(err);
    }
  }

  static async topupBalance(req, res, next) {
    try {
      const { id } = req.params;
      const { balance } = req.body;
      const topup = await User.increment("balance",
        {
          where: {
            id,
          },
          by: balance
        }
      );
      res.status(200).json({message:`The balance added ${balance}`});
    } catch (err) {
      next(err);
    }
  }

  static async deleteUser(req, res, next) {
    try {
      const { id } = req.params;
      const deleted = await User.destroy({
        where: {
          id,
        },
      });
      res.status(201).json(deleted);
    } catch (err) {
      next(err);
    }
  }

  static async updateLocation(req, res, next) {
    try {
      const { id } = req.params;
      console.log(req.body);
      const { longitude, latitude } = req.body;
      const updated = await User.update(
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

  static async getUserById(req, res, next) {
    try {
      const { id } = req.params;
      const user = await User.findOne({
        where: {
          id,
        },
        attributes: {
          exclude: ["password", "createdAt", "updatedAt"],
        },
      });

      res.status(200).json(user);
    } catch (err) {
      next(err);
    }
  }

  static async getUserLocation(req, res, next) {
    try {
      const id = +req.params.id;
      const user = await User.findOne({
        where: {
          id,
        },
        attributes: {
          exclude: ["password", "createdAt", "updatedAt", "username", "email", "address", "phoneNumber", "balance", "role"],
        },
      });
      if (!user) throw new Error("Not found");
      res.status(200).json(user);
    } catch (err) {
      next(err);
    }
  }
}

module.exports = UserController;
