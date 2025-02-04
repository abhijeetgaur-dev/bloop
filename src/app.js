const express = require("express");
const app = express();
const {connectDB} = require("./config/database")
// const {auth, userAuth} = require("./middlewares/auth")

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


