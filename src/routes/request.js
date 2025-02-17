const { loginAuth } = require("../middlewares/auth");
const ConnectionRequest = require("../models/connectionRequest")

const express = require("express")

const requestRouter = express.Router();

requestRouter.post("/request/send/:status/:userId", loginAuth,async (req, res) =>{
  try{
    const fromUserId = req.user._id;
    const toUserId = req.params.userId;
    const status = req.params.status;
  
    const isStatusValid = ["ignored", "interested"];
    
    if(!isStatusValid.includes(status)){
      throw new Error ("Invalid Status");
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