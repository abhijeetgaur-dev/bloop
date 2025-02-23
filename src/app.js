const express = require("express");
const app = express();
const {connectDB} = require("./config/database")
const cookieParser = require("cookie-parser");
const cors = require("cors");

app.use(cors({
    origin : "http://localhost:5173/",
    credentials: true,
	})
);
app.use(express.json());
app.use(cookieParser());

const authRouter = require("./routes/auth.js");
const profileRouter = require("./routes/profile.js");
const requestRouter = require("./routes/request.js");


app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);


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


