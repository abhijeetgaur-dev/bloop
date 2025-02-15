const User  = require("../models/user")
const jwt = require("jsonwebtoken");

const loginAuth =  async (req, res, next)=>{
    try{
        const {token} = req.cookies;

        if(!token){
            throw new Error ("token is not valid!");
        }
        const tokenValue = await jwt.verify(token, "BLoop13%9");
        
        if(!tokenValue){
            throw new Error("Invalid Token!");
        }
        
        const user = await User.findById(tokenValue);
        
        if(!user){
            throw new Error ("User not found!");
        }
        req.user = user;
        
        next();
    }
    catch(err){
        res.send("something went wrong!" + err)
    }


}


module.exports = {
    loginAuth,

};