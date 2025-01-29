const express =  require('express');

const app = express();


app.get("/user", (req,res) =>{
    res.send({name: "John", age: 30});
})

app.post("/user", (req,res)=>{
    res.send("user added");
})

app.delete("/user", (req,res) =>{
    res.send('User deleted');
})

app.use("/test", (req,res) =>{
    res.send('Hello Test')
})



app.use("/",(req,res) =>{
    res.send('Hello World')
})

app.listen(3000)
console.log("listening on port 3000")