const { User } = require("../models");

class UserController {
  static async getUsers(req, res, next) {
    try {
      const users = await User.findAll();
      res.status(200).json(users);
    } catch (error) {
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
    } catch (error) {
      next(err);
    }
  }

  static async updateUser(req, res, next) {
    try {
      const { id } = req.params;
      const { username, email, password, phoneNumber, address } = req.body;
      const updated = await User.update(
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
    } catch (error) {
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
    } catch (error) {
      next(err);
    }
  }
}

module.exports = UserController;
