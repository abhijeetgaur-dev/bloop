const express = require("express")
const {loginAuth} = require("../middlewares/auth")


const profileRouter = express.Router();

profileRouter.get("/profile",loginAuth ,async (req,res) =>{
  try{
      const user = req.user;
      res.send(user);
  }
  catch(err){
      res.send("Something went wrong " + err.message);
  }

});


module.exports = profileRouter;