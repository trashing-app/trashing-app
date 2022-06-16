const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const env = require("dotenv").config();
const SECRET_KEY = process.env.SECRET_KEY;

const hashedPassword = (password) => bcrypt.hashSync(password, 8);
const checkPassword = (password, hashedPassword) =>
  bcrypt.compareSync(password, hashedPassword);
const encode = (payload) => jwt.sign(payload, SECRET_KEY);
const decode = (token) => jwt.verify(token, SECRET_KEY);

module.exports = {
  hashedPassword,
  checkPassword,
  encode,
  decode,
};
