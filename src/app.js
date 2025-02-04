const express = require("express");
const app = express();
const {connectDB} = require("./config/database")
const User  = require("./models/user")
// const {auth, userAuth} = require("./middlewares/auth")

app.use(express.json());

app.post("/signup" , async (req,res)=>{
    const user = new User (req.body);
    try{        
        await user.save();
        res.send("user added successfully");
    }
    catch(err){
        res.status(400).send("Error sending data : " + err.message);
    }
})

connectDB()
    .then(()=>{
        console.log("Database Successfully connected");
        app.listen(7777, () => {
            console.log("Listening on port 7777");
        });
    })
    .catch((err)=>{
        console.log(err);
    });


