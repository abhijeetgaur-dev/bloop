const express = require("express");
const app = express();

app.use("/", (req,res,next)=>{
    console.log("Handling all HTTP requests");
    next();
})

app.get("/user/add", (req,res) =>{
    console.log("Handling /user/add route");
    res.send("New User added");
})

app.get("/user/delete", (req,res)=>{
    console.log("Handling /user/add route");
    res.send("User Deleted");
})


app.listen(7777, () => {
    console.log("Listening on port 7777");
});
