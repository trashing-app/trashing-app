const { Collector } = require("../models");
const { checkPassword, encode } = require("../helpers/jwt-bcrypt");

class PublicCollectorController {
  static async login(req, res, next) {
    try {
      const { email, password } = req.body;
      const foundCollector = await Collector.findOne({
        where: {
          email,
        },
      });
      if (!foundCollector) {
        throw new Error("invalid email");
      }
      const validPassword = checkPassword(password, foundCollector.password);
      if (!validPassword) {
        throw new Error("invalid password");
      }
      const payload = {
        id: foundCollector.id,
        username: foundCollector.username,
      };
      const access_token = encode(payload);
      res.status(200).json({
        id: foundCollector.id,
        username: foundCollector.username,
        email: foundCollector.email,
        access_token,
      });
    } catch (err) {
      next(err);
    }
  }

  static async register(req, res, next) {
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
}

module.exports = PublicCollectorController;
