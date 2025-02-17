const express = require("express");
const {loginAuth} = require("../middlewares/auth");

const requestRouter = express.Router();

requestRouter.post("/sendConnectionRequest", loginAuth, async (req,res) =>{
    const user =  req.user;

    res.send(user.firstName + " sent a connection request");
})

module.exports = requestRouter;