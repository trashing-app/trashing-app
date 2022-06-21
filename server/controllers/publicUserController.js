const { User } = require('../models');
const { checkPassword, encode } = require('../helpers/jwt-bcrypt');

class PublicUserController {
  static async login(req, res, next) {
    try {
      const { email, password } = req.body;
      if(!email) throw new Error("Email is required")
      if(!password) throw new Error("Password is required")
      const foundUser = await User.findOne({
        where: {
          email,
        },
      });
      if (!foundUser) {
        throw new Error('Invalid email/password');
      }
      const validPassword = checkPassword(password, foundUser.password);
      if (!validPassword) {
        throw new Error('Invalid email/password');
      }
      const payload = {
        id: foundUser.id,
        username: foundUser.username,
      };
      const access_token = encode(payload);
      res.status(200).json({
        id: foundUser.id,
        username: foundUser.username,
        email: foundUser.email,
        access_token,
      });
    } catch (err) {
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
      res.status(201).json({
        id:newUser.id,
        email:newUser.email
      });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = PublicUserController;
