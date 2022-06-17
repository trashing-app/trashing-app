const { User } = require("../models");
const { decode } = require("../helpers/jwt-bcrypt");

async function isLoggedIn(req, res, next) {
  try {
    const { access_token } = req.headers;
    const payload = decode(access_token);
    const { id, username } = payload;
    const foundUser = await User.findOne({
      where: {
        username,
      },
    });
    if (!foundUser) {
      throw new Error("invalid token");
    }
    req.pass = {
      id,
      username,
    };
    next();
  } catch (err) {
    next(err);
  }
}

module.exports = { isLoggedIn };
