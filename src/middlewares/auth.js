const User  = require("../models/user")
const jwt = require("jsonwebtoken");

const loginAuth =  async (req, res, next)=>{
    try{
        const {token} = req.cookies;

        if(!token){
            return res.status(401).send("Please Login!");
        }
        const tokenValue = await jwt.verify(token, "BLoop13%9");  

        if(!tokenValue){
            throw new Error("Invalid Token!");
        }

        const {_id} = tokenValue;
        
        const user = await User.findById(_id);
        
        if(!user){
            throw new Error ("User not found!");
        }
        req.user = user;
        
        next();
    }
    catch(err){
        res.status(400).send("something went wrong!" + err)
    }


}


module.exports = {
    loginAuth,

};