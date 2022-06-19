const { User } = require('../models');
const { Sequelize } = require('sequelize');
class UserController {
  static async getUsers(req, res, next) {
    try {
      const users = await User.findAll();
      res.status(200).json(users);
    } catch (err) {
      next(err);
    }
  }

  static async addUser(req, res, next) {
    try {
      const { username, email, password, phoneNumber, address } = req.body;
      const newUser = await User.create({
        username,
        email,
        password,
        phoneNumber,
        address,
      });
      res.status(201).json(newUser);
    } catch (err) {
      next(err);
    }
  }

  static async updateUser(req, res, next) {
    try {
      const { id } = req.params;
      const { username, email, password, phoneNumber, address } = req.body;
      const updated = await User.update(
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
      res.status(201).json(updated);
    } catch (err) {
      next(err);
    }
  }

  static async topupBalance(req, res, next) {
    try {
      const { id } = req.params;
      const { balance } = req.body;
      const topup = await User.update(
        {
          balance,
        },
        {
          where: {
            id,
          },
        }
      );
      res.status(201).json(topup);
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
      // const { location } = req.body;
      const updated = await User.update(
        {
          location: Sequelize.fn('ST_GeomFromText', 'POINT(107.5925576773082 -6.940669415817259)'),
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
          exclude: ['password', 'createdAt', 'updatedAt'],
        },
      });

      res.status(200).json(user);
    } catch (err) {
      next(err);
    }
  }
}

module.exports = UserController;
