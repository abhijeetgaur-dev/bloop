const mongoose= require("mongoose");
const { loginAuth } = require("../middlewares/auth");
const ConnectionRequest = require("../models/connectionRequest")
const User = require("../models/user")

const express = require("express")

const requestRouter = express.Router();

requestRouter.post("/request/send/:status/:userId", loginAuth,async (req, res) =>{
  try{
    const fromUserId = req.user._id;
    const toUserId = req.params.userId;
    const status = req.params.status;
  
    //is to user Valid?
    const isToUserIdValid = await User.findById(toUserId);

    if(!isToUserIdValid){
      return res
            .status(400)
            .json({message: "INVALID USER ID"});
    }

    const isStatusValid = ["ignored", "interested"];
    
    if(!isStatusValid.includes(status)){
      return res.status(400)
      .json({messsage : "INVALID STATUS : " + status})
    }

    //check for dupicate connection request
    const isConnectionRequestDupicate = ConnectionRequest.findOne({
      $or:[
        {fromUserId,toUserId},
        {
          fromUserId: toUserId,
          toUSerId: fromUserId
        }
      ]
    });

    if(isConnectionRequestDupicate){
      return res
            .status(400)
            .json({message : "DUPLICATE CONNECTION REQUEST"});
    }

    const connectionRequest = new ConnectionRequest({
      fromUserId,
      toUserId,
      status
    })

    const data = await connectionRequest.save();

    res.status(200).json({
      message : "Request Sent",
      data
    })
  }
  catch(err){
    res.send("Something Went Wrong! " + err);
  }
})

module.exports = requestRouter;