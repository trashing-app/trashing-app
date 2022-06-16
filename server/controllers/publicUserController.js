const { User } = require("../models");
const { checkPassword, encode } = require("../helpers/jwt-bcrypt");

class PublicUserController {
  static async login(req, res, next) {
    try {
      const { email, password } = req.body;
      const foundUser = await User.findOne({
        where: {
          email,
        },
      });
      if (!foundUser) {
        throw new Error("invalid email");
      }
      const validPassword = checkPassword(password, foundUser.password);
      if (!validPassword) {
        throw new Error("invalid password");
      }
      const payload = {
        id: foundUser.id,
        username: foundUser.username,
      };
      const access_token = encode(payload);
      res.status(200).json(access_token);
    } catch (error) {
      next(err);
    }
  }

  static async register(req, res, next) {
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
}

module.exports = PublicUserController;
