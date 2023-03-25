
const boom = require('@hapi/boom');

const { encrypt, compare } = require("../utils/encript");
const  {messageLogin}  = require("../utils/emailprefabs/authemail");
const { tokenSign } = require("../utils/token");



const User = require("../models/User");

const loginCtrl = async (req, res,next) => {
    try {
      const body = req.body;
      var user = await User.findOne({ email: body.email });
      if (!user) {
        next(boom.notFound("User Not Found"))

      }
      const checkPassword = await compare(body.password, user.password);
  
      if (!checkPassword) {
        next(boom.unauthorized("Incorret Password"));
      }

      var x = Math.floor(Math.random()*100000);
      user.verified.state=0
      user.verified.code=x

      user= await User.findByIdAndUpdate(user._id,user)
      //await messageLogin(user.email,user._id,x)
      res.status(200).send("enviado")
  
    } catch (e) {
      next(boom.badRequest(e));
    }
  };

  const message = async (req, res,next) => {

    const { id } = req.params;
    var user = await User.findById(id);
    console.log(id)
    console.log(user)
    var ipguard = req.header('x-forwarded-for') || req.connection.remoteAddress;
    if(user.verified.state===0 && user.verified.code===req.body.code){
      console.log("No ip")
      if (!user.ips.find(x=>x===ipguard)){
        console.log("No ip")
        user.ips.push(ipguard)
      }

      user.verified.state=1
      user= await User.findByIdAndUpdate(user._id,user)
      const tokenJwt = await tokenSign(user);
  
      const data = {
        token: tokenJwt,
        User: user,
      };
  
      res.send({ data });
    }else{
      next(boom.clientTimeout("Bad Time"))
    }
    

  };




  module.exports = { loginCtrl , message};