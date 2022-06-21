const { User, Collector } = require("../models");
const { decode } = require("../helpers/jwt-bcrypt");

async function isLoggedIn(req, res, next) {
  try {
    const { access_token } = req.headers;
    if(!access_token) throw new Error('No token')
    const payload = decode(access_token);
    if(!payload) throw new Error('Invalid token')
    const { id, username } = payload;
    const foundUser = await User.findOne({
      where: {
        username,
      },
    });
    const foundCollector = await Collector.findOne({
      where: {
        username,
      },
    });

    if (!foundUser && !foundCollector) throw new Error("Invalid token")
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
