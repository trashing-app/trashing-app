const { Collector } = require("../models");
const { checkPassword, encode } = require("../helpers/authN-authZ");

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
      const payload = foundUser.id;
      const access_token = encode(payload);
      res.status(200).json(access_token);
    } catch (error) {
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
    } catch (error) {
      next(err);
    }
  }
}

module.exports = PublicCollectorController;
