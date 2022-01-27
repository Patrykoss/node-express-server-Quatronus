const jwt = require('jsonwebtoken');
const config = require('./../config/auth/auth.config');
const { TokenExpiredError } = require ('jsonwebtoken');

exports.verifyToken  = (req, res, next) => {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]
  if (token == null) {
    return res.sendStatus(401)
  }
  jwt.verify(token, config.secret, (err,data) => {
    if (err) {
      if(err instanceof TokenExpiredError)
        return res.status(401).json({expired: true});
      else
        return res.sendStatus(401);
    }
    req.role = data.role;
    req.idClient = data.id;
  })
  next()
}

exports.isAdmin = (req, res, next) => {
  if(req.role == 'Admin') {
    next()
  }else (
    res.sendStatus(403)
  )
};

exports.isUser = (req, res, next) => {
  if(req.role == 'User') {
    next()
  }else (
    res.sendStatus(403)
  )
};

exports.isAdminOrUser = (req, res, next) => {
  if(req.role == 'Admin' || req.role == 'User') {
    next()
  }else (
    res.sendStatus(403)
  )
};


exports.getTokenValue  = (req, res, next) => {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]
  if (token == null) {
    return res.sendStatus(401)
  }
  const decoded = jwt.decode(token, config.secret);
  if(decoded){
    req.idClient = decoded.id;
    next();
  }
}