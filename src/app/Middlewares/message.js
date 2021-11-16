module.exports = {
  message(err, req, res, next){
    if (err instanceof Error) {
      return res.status(400).json({
        status: err.name,
        message: err.message,
        devMessage: err.stack
      });
    }
  
    return res.status(500).json({
      status: "Error",
      message: err.message,
      devMessage: err.stack
    });
  }
}