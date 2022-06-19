function errorHandler(error, req, res, next) {
  console.log(error);
  let code = 500;
  let msg = "Internal Server Error";

  if (error.message){
    code = 400
    msg = error.message
  }
  
  if (error.message === 'Not found'){
    code = 404
    msg = error.message
  }


  res.status(code).json({
    statusCode: code,
    message: msg,
  });
}

module.exports = { errorHandler };
