const express = require("express")
const {loginAuth} = require("../middlewares/auth")
const {validateEditProfileData} = require("../utils/validation")


const profileRouter = express.Router();

profileRouter.get("/profile/view",loginAuth ,async (req,res) =>{
  try{
      const user = req.user;
      res.send(user);
  }
  catch(err){
      res.send("Something went wrong " + err.message);
  }

});

profileRouter.patch("/profile/edit", loginAuth, async (req, res) =>{
  try{
    
    if(!validateEditProfileData(req)){
      throw new Error ("Data sent is not valid");
    }

    const loggedInUser = req.user;

    Object.keys(req.body).forEach((field) => {
        loggedInUser[field] =  req.body[field];
    })

    await loggedInUser.save();
    
    res.send(`${loggedInUser.firstName} your was updated successfully!`);
  }
  catch(err){
    res.send("Something Went Wrong " + err);
  }
})

module.exports = profileRouter;