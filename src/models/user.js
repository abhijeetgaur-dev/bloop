const mongoose = require("mongoose");
const {Schema, model} = mongoose;

const userSchema = new Schema ({
    firstName:{
        type: String,
        required: true
    },
    lastName:{
        type: String,
    },
    emailId:{
        type: String,
        unique : true,
        required : true,
        lowercase : true,
        trim :true,
    },
    password :{
        type: String,
        required: true
    },
    age : {
        type: Number,
        min: 18
    },
    gender: {
        type: String,
        validate(value){
            if(!["male", "female", "others"].includes(value)){
                throw new Error(" Gender data not valid");
            }
        }
    },
    about :{
        type: String,
        default: "default bio"
    },
    photoUrl : {
        type: String,
        default: "https://static.vecteezy.com/system/resources/thumbnails/020/765/399/small_2x/default-profile-account-unknown-icon-black-silhouette-free-vector.jpg"

    },
    skills :{
        type: [String]
    }
    },
    {
      timestamps : true 
    }
);

const UserModel = model("user", userSchema);

module.exports = UserModel;