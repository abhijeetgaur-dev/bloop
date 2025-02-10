const express = require("express");
const app = express();
const {connectDB} = require("./config/database")
const User  = require("./models/user")
// const {auth, userAuth} = require("./middlewares/auth")

app.use(express.json());

//implementing email search feature
app.get("/user", async (req,res) =>{
    
    try{
        const userData = await User.find({emailId : req.body.email});
        res.send(userData);
    }
    catch(err){
        res.send("Something went wrong " + err.message);
    }

})

//implementing feed API
app.get("/feed" , async (req,res)=>{
    try{
        // const allUsers = await User.find({});
        res.send(await User.find({}))
    }
    catch(err){
        res.status(404).send("Something went wrong" + err.message);
    }
})


app.post("/user" , async (req,res)=>{
    const user = new User (req.body);
    try{        
        await user.save();
        res.send("user added successfully");
    }
    catch(err){
        res.status(400).send("Error sending data : " + err.message);
    }
})

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
    
        await User.findByIdAndUpdate({_id : id}, data, {runValidators: true});
        res.send("user update successfully!" + await User.findById(id))
    }
    catch(err){
        res.send("Something Went Wrong! Please help!" + err);
    }
})

app.delete("/user", async (req, res) =>{
    try{
        await User.findByIdAndDelete(req.body.id);
        res.send("User deleted successfully");
    }
    catch{
        res.send("Something Went Wrong!");
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
        console.log("Cannot connect" + err.message);
    });


