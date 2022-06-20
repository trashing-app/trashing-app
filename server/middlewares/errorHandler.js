function errorHandler(error, req, res, next) {
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

  if (error.message === 'Email is required'){
    code = 401
    msg = error.message
  }

  if (error.message === 'Password is required'){
    code = 401
    msg = error.message
  }

  if (error.message === 'Invalid email/password'){
    code = 401
    msg = error.message
  }

  if (error.name === "SequelizeValidationError"){
    code = 400
    msg = error.errors[0].message
  }


  res.status(code).json({
    statusCode: code,
    message: msg,
  });
}

module.exports = { errorHandler };
