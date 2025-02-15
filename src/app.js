const express = require("express");
const app = express();
const {connectDB} = require("./config/database")
const User  = require("./models/user")
const {validateSignupData} = require("./utils/validation")

const { default: isEmail } = require("validator/lib/isEmail");
const cookieParser = require("cookie-parser");

const {loginAuth} = require("./middlewares/auth")

app.use(express.json());
app.use(cookieParser());

app.get("/login", async (req, res) =>{

  try{
    const {email, password} = req.body;
    const user = await User.findOne({emailId : email});
    console.log(user)

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


//implementing email search feature
app.get("/user", async (req,res) =>{
    
    try{
        const userData = await User.find({emailId : req.body.email});
        res.send(userData);
    }
    catch(err){
        res.send("Something went wrong " + err.message);
    }

});

//implementing feed API
app.get("/feed" , async (req,res)=>{
    try{
        // const allUsers = await User.find({});
        res.send(await User.find({}))
    }
    catch(err){
        res.status(404).send("Something went wrong" + err.message);
    }
});


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

app.patch("/user/:id", async (req,res) =>{
    const id = req.params?.id;
    const data =  req.body;
    

    try{
        const ALLOWED_UPDATES = ["photoUrl","about","gender","age","skills"];
    
        const isUpdateAllowed = Object.keys(data).every((k)=>{
            return ALLOWED_UPDATES.includes(k)
        });

        if(!isUpdateAllowed){
            throw new Error("Update not Allowed");
        }
        
        if(data?.skills.length > 5 ){
            throw new Error("Enter skills less than 5")
        }
    
        await User.findByIdAndUpdate({_id : id}, data, {runValidators: true});
        res.send("user update successfully!" + await User.findById(id))
    }
    catch(err){
        res.status(400).send("UPDATE FAILED " + err);
    }
});

app.delete("/user", async (req, res) =>{
    try{
        await User.findByIdAndDelete(req.body.id);
        res.send("User deleted successfully");
    }
    catch{
        res.send("Something Went Wrong!");
    }
});


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


