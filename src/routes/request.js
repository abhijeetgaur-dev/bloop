const express = require("express")
const requestRouter = express.Router();

const mongoose= require("mongoose");
const { loginAuth } = require("../middlewares/auth");
const ConnectionRequest = require("../models/connectionRequest")
const User = require("../models/user")
const sendEmail = require("../utils/sendEmail")



requestRouter.post("/request/send/:status/:userId", loginAuth,async (req, res) =>{
  try{
    const fromUserId = req.user._id;
    const toUserId = req.params.userId;
    const status = req.params.status;

    const allowedStatus = ["ignored", "interested"];
    
    if(!allowedStatus.includes(status)){
      return res.status(400)
      .json({messsage : "INVALID STATUS : " + status})
    }

    //is to user Valid?
    const isToUserIdValid = await User.findById(toUserId);



    if(!isToUserIdValid){
      return res
            .status(400)
            .json({message: "INVALID USER ID"});
    }



    //check for dupicate connection request
    const isConnectionRequestDupicate = await ConnectionRequest.findOne({
      $or:[
        {fromUserId,toUserId},
        {
          fromUserId: toUserId,
          toUserId: fromUserId
        }
      ]
    });

    if(isConnectionRequestDupicate){
      return res
            .status(400)
            .json({message : "Connection Request Already Exists"});
    }

    const connectionRequest = new ConnectionRequest({
      fromUserId,
      toUserId,
      status
    })

    const data = await connectionRequest.save();
    
    const emailRes = await sendEmail.run(`Friend request from ${req.user.firstName}`,`${isToUserIdValid.firstName}, You have recieved a new friend request from ${req.user.firstName}`);


    res.status(200).json({
      message : "Request Sent",
      data
    })
  }
  catch(err){
    res.status(400).send("Something Went Wrong! " + err);
  }
})

requestRouter.post("/request/review/:status/:requestId", loginAuth, async(req,res)=>{
  try {
    const loggedInUser = req.user;
    const { status, requestId } = req.params;

    const allowedStatus = ["accepted", "rejected"];
    if (!allowedStatus.includes(status)) {
      return res.status(400).json({ messaage: "Status not allowed!" });
    }

    const connectionRequest = await ConnectionRequest.findOne({
      _id: requestId,
      toUserId: loggedInUser._id,
      status: "interested",
    });
    if (!connectionRequest) {
      return res
        .status(404)
        .json({ message: "Connection request not found" });
    }

    connectionRequest.status = status;

    const data = await connectionRequest.save();

    res.json({ message: "Connection request " + status, data });

 }
 catch(err){
  res.send("Something Went Wrong!" + err);
 }
 
  
})


module.exports = requestRouter;