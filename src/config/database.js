const mongoose = require("mongoose");

const connectDB = async () => {
	console.log(process.env.DB_CONNECTION_STRING)
	await mongoose.connect(process.env.DB_CONNECTION_STRING);
	
};

connectDB()
.then(()=>{
	console.log("Db connected successfully")
})
.catch((err) =>{
	console.log("Couldnt connetc to DB " + err);
})

module.exports= {connectDB}
