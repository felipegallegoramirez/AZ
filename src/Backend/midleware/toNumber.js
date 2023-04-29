
function ToNumber(list) {
  return (req, res, next) => {
    try {
      list.forEach(element => {
        if (req.body[element]) {
          req.body[element] = Number(req.body[element]);
        }
      });
      next();
    }catch(err){
      next(err)
    }
}
}

module.exports = ToNumber;
