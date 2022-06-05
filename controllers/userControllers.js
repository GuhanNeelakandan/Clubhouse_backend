const User =require('../model/userModel')
const bcrypt =require('bcryptjs')
const jwt =require('jsonwebtoken');

module.exports.login = async (req, res, next) => {
    try {
      const { username, password } = req.body;
      const user = await User.findOne({ username });
      if (!user)
        return res.json({ msg: "Incorrect Username or Password", status: false });
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid)
        return res.json({ msg: "Incorrect Username or Password", status: false });
      delete user.password;
      let token = jwt.sign({name:username, id:user._id},'ABSecret',{expiresIn:'1hr'})
      return res.json({ status: true, user,msg:"loggedIn",token });
    } catch (error) {
      next(error);
    }
  };
  
  module.exports.register = async (req, res, next) => {
    try {
      const { username, email, password } = req.body;
      const usernameCheck = await User.findOne({ username });
      if (usernameCheck)
        return res.json({ msg: "Username already used", status: false });
      const emailCheck = await User.findOne({ email })
      if (emailCheck)
        return res.json({ msg: "email already used", status: false });
      const hashpassword = await bcrypt.hash(password, 10);
      const user = await User.create({
        email,
        username,
        password: hashpassword,
      });
      
      delete user.password;
      return res.json({ status: true, user,msg:"signedIn"});
    } catch (error) {
      console.log(error)
    }
  }