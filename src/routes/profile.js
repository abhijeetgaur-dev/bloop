const express = require("express");
const {loginAuth} = require("../middlewares/auth");
const {validateEditProfileData, validateEditPasswordData} = require("../utils/validation");
const bcrypt = require("bcrypt");


const profileRouter = express.Router();

profileRouter.get("/profile/view",loginAuth ,async (req,res) =>{
  try{
      const user = req.user;
      res.send(user);
  }
  catch(err){
      res.status(400).send("Something went wrong " + err.message);
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

    res.send({message : `${loggedInUser.firstName} your data was updated successfully!`,
              data : loggedInUser});
  }
  catch(err){
    res.status(401).send("Something Went Wrong " + err);
  }
})

profileRouter.patch("/profile/password", loginAuth, async (req, res) =>{
  try{
    const loggedInUser = req.user;
    const {password} = req.body;
    validateEditPasswordData(password);
    const hashPassword = await bcrypt.hash(password, 10);

    loggedInUser.password = hashPassword;
    
    await loggedInUser.save()
    res.send("password updated successfully!")

  }
  catch(err){
    res.status(400).send("Something Went Wrong " + err);
  }
})
module.exports = profileRouter;