const express = require("express")
const User = require("../models/user")
const {validateSignupData} = require("../utils/validation")
const bcrypt = require("bcrypt")

const authRouter =  express.Router();

authRouter.post("/signup" , async (req,res)=>{
  try{
  //validation of Data
  validateSignupData(req);

  const {firstName, lastName ,emailId, password, skills, age, gender, about} = req.body;
  //encryption of password
  const hashPassword = await bcrypt.hash(password, 10);

  

  //creating a new instance of User model
  const user = new User ({
    firstName, 
    emailId, 
    password : hashPassword,
    lastName,
    skills,
    age,
    gender,
    about
  } );

  //saving the user
  await user.save();
  res.send("user added successfully");

  }
  catch(err){
      res.status(400).send("ERROR : " + err.message);
  }
});


authRouter.post("/login", async (req, res) =>{

try{
    const {emailId, password} = req.body;
    const user = await User.findOne({emailId : emailId});


    if(!user){
        throw new Error ("Invalid Credentials!");
    }

    const checkPass = await user.validatePass(password);

    if(!checkPass){
        throw new Error ("Invalid Credentials");
    }
    else{
        const token = await user.getJWT();

        res.cookie("token", token )
    }
    res.send(user);
      
  }
  catch(err){
    res.send("Something went wrong " + err.message);
  }

});


authRouter.post("/logout", async (req,res) =>{
  res.cookie("token", null , {
    expires : new Date (Date.now())
  })
  .send("User Logged Out");
});


module.exports = authRouter;