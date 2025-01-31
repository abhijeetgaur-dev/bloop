const express =  require('express');

const app = express();


app.get("/user", (req,res) =>{
    res.send({name: "John", age: 30}, {name: "Jane", age: 25}), {name: "Doe", age: 40};
})

app.post("/user", (req,res)=>{
    res.send("user added");
})



app.use("/",(req,res) =>{
    res.send('Hello World')
})

app.listen(3000)
console.log("listening on port 3000")