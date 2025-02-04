const express = require("express");
const app = express();
const {connectDB} = require("./config/database")
const User  = require("./models/user")
// const {auth, userAuth} = require("./middlewares/auth")



app.post("/signup" , async (req,res)=>{
    const user = new User ({
        firstName : "kyunki",
        lastName: "gaur",
        emailId : "abhijeetgaur@gmail.com",
        password : "hello",
        gender: "male"
    });

    await user.save();

    res.send("user added successfully");
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


