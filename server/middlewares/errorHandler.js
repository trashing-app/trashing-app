function errorHandler(req, res, next) {
  let code = 500;
  let msg = "Internal Server Error";

  res.status(code).json({
    statusCode: code,
    message: msg,
  });
}

module.exports = { errorHandler };
