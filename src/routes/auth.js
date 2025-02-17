const express = require("express")
const User = require("../models/user")
const {validateSignupData} = require("../utils/validation")
const bcrypt = require("bcrypt")

const authRouter =  express.Router();

authRouter.post("/signup" , async (req,res)=>{
  try{
  //validation of Data
  validateSignupData(req);

  const {firstName, lastName ,emailId, password} = req.body;
  //encryption of password
  const hashPassword = await bcrypt.hash(password, 10);
  console.log(hashPassword);
  

  //creating a new instance of User model
  const user = new User ({
    firstName, 
    emailId, 
    password : hashPassword,
    lastName} );

  //saving the user
  await user.save();
  res.send("user added successfully");

  }
  catch(err){
      res.status(400).send("ERROR : " + err.message);
  }
});


authRouter.get("/login", async (req, res) =>{

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
    res.send("Login Successful");
      
  }
  catch(err){
    res.send("Something went wrong " + err.message);
  }

});

module.exports = authRouter;