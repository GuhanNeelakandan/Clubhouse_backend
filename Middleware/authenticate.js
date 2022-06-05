const req = require("express/lib/request");
const jwt =require("jsonwebtoken")

function authenticate(req, res, next) {
    // Check token present in header
    if (req.headers.authorization) {
      let decode = jwt.verify(req.headers.authorization, 'ABSecret');
      if (decode) {
        req.userId = decode.id;
        next();
      } else {
        res.status(401).json({ message: 'Unauthorized' });
      }
    } else {
      res.status(401).json({ message: 'Unauthorized' });
    }    
  }


module.exports=authenticate;