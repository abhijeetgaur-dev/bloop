const express = require("express");
const {loginAuth} = require("../middlewares/auth");
const ConnectionRequest = require("../models/connectionRequest");
const User = require("../models/user");

const userRouter = express.Router();

userRouter.get("/user/requests/recieved",loginAuth ,async (req,res)=>{
  const user = req.user;
    try{
      const allrequests =  await ConnectionRequest.find({
        toUserId : user._id,
        status: "interested",
      }).populate("fromUserId","firstName lastName photoUrl age gender about skills")
      
      res.send(allrequests);

    }catch(err){
      res.status(400).send("Something Went Wrong : "+err);
    }
})

userRouter.get("/user/connections", loginAuth, async (req,res)=>{
    try{
      const loggedInUser = req.user;
      const connections = await ConnectionRequest.find({
        $or: [
          {toUserId: loggedInUser._id, status: "accepted"},
          {fromUserId: loggedInUser._id, status: "accepted"},
        ]
        
      }).populate("fromUserId","firstName lastName photoUrl age gender about skills")
        .populate("toUserId","firstName lastName photoUrl age gender about skills");

      const data = connections.map((row) => {
        if(row.fromUserId._id.toString() === loggedInUser._id.toString()){
          return row.toUserId;
        }
          return row.fromUserId;
      })
      
      res.send(data);

    }catch(err){
      res.status(400).send("ERR occured :" + err);
    }
})

userRouter.get("/user/feed", loginAuth, async (req,res)=>{
  try{
    const loggedInUser = req.user;
    const users= await User.find();
    const data = await ConnectionRequest.find({
      $or: [
        {fromUserId : loggedInUser._id},
        {toUserId : loggedInUser._id}
      ]
    })
    const blockedUsers = new Set();
    
    data.forEach((connection) =>{
      blockedUsers.add(data.fromUserId);
      blockedUsers.add(data.toUserId);
    })

    const feedData = await 




    res.send(feedData);
  }catch(err){
    res.status(400).send("Error : "+err);
  }
})
module.exports = userRouter;