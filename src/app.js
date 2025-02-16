const express = require("express");
const app = express();
const {connectDB} = require("./config/database")
const User  = require("./models/user")
const {validateSignupData} = require("./utils/validation")
const cookieParser = require("cookie-parser");
const {loginAuth} = require("./middlewares/auth")

app.use(express.json());
app.use(cookieParser());

app.post("/signup" , async (req,res)=>{
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

app.get("/login", async (req, res) =>{

  try{
    const {email, password} = req.body;
    const user = await User.findOne({emailId : email});


    if(!user){
        throw new Error ("Invalid Credentials!");
    }

    checkPass = await user.validatePass(password);

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


app.get("/profile",loginAuth ,async (req,res) =>{
    try{
        const user = req.user;
        res.send(user);
    }
    catch(err){
        res.send("Something went wrong " + err.message);
    }

});




app.post("/sendConnectionRequest", loginAuth, (req,res) =>{
    const user = req.user;

    res.send(user.firstName + " sent a request");
})


connectDB()
    .then(()=>{
        console.log("Database Successfully connected");
        app.listen(7777, () => {
            console.log("Listening on port 7777");
        });
    })
    .catch((err)=>{
        console.log("Cannot connect" + err.message);
    });


