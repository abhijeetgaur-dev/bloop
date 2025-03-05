const express = require("express");
const {loginAuth} = require("../middlewares/auth");
const ConnectionRequest = require("../models/connectionRequest");

const userRouter = express.Router();

userRouter.get("/user/requests/recieved",loginAuth ,async (req,res)=>{
  const user = req.user;
    try{
      const allrequests =  await ConnectionRequest.find({
        toUserId : user._id,
        status: "interested",
      }).populate("fromUserId",["firstName", "lastName"])
      
      res.send(allrequests);

    }catch(err){
      res.status(400).send("Something Went Wrong : "+err);
    }
})

module.exports = userRouter;