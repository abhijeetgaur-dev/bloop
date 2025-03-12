const mongoose = require("mongoose");

const connectDB = async () => {
	await mongoose.connect("mongodb+srv://abhijeetgaurdev:eJs5iwuCaf1pIau5@cluster0.bxgyc.mongodb.net/bloop?retryWrites=true&w=majority&appName=Cluster0");
	
};

connectDB()
.then(()=>{
	console.log("Db connected successfully")
})
.catch((err) =>{
	console.log("Couldnt connetc to DB " + err);
})

module.exports= {connectDB}
