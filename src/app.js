require("dotenv").config();
const express = require("express");
const app = express();
const {connectDB} = require("./config/database")
const cookieParser = require("cookie-parser");
const cors = require("cors");
const http = require("http");



app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PATCH", "PUT", "DELETE", "OPTIONS"], 
    allowedHeaders: ["Content-Type", "Authorization"],
}));
app.use(express.json());
app.use(cookieParser());

const authRouter = require("./routes/auth.js");
const profileRouter = require("./routes/profile.js");
const requestRouter = require("./routes/request.js");
const userRouter = require("./routes/user.js");
const initializeSocket = require("./utils/sockets.js");


app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);
app.use("/", userRouter);

const server = http.createServer(app);
initializeSocket(server)


connectDB()
    .then(()=>{
        server.listen(process.env.PORT, () => {
            console.log("Listening on port 7777");
        });
    })
    .catch((err)=>{
        console.log("Cannot connect" + err.message);
    });


