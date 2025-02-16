const express = require("express");
const app = express();
const {connectDB} = require("./config/database")
const User  = require("./models/user")
const {validateSignupData} = require("./utils/validation")
const cookieParser = require("cookie-parser");
const {loginAuth} = require("./middlewares/auth")

app.use(express.json());
app.use(cookieParser());

const authRouter = require("./routes/auth.js")
const profileRouter = require("./routes/profile.js")
const requestRouter = require("./routes/request.js")

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


