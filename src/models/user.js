const mongoose = require("mongoose");
const {Schema, model} = mongoose;
const validator = require("validator")
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

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
        validate(value){
					if(!validator.isEmail(value)){
						throw new Error(" Enter valid Email " + value);
					}
        }
    },
    password :{
        type: String,
        required: true,
				validate(value){
					if(!validator.isStrongPassword(value)){
						throw new Error("Enter strong password");
				}
			}
    },
    age : {
        type: Number,
        min: 18
    },
    gender: {
        type: String,
        enum: {
            values : ['male' , 'female' , 'others'],
            message : `{VALUE} is not a valid gender type!`
        },
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
        default: "https://static.vecteezy.com/system/resources/thumbnails/020/765/399/small_2x/default-profile-account-unknown-icon-black-silhouette-free-vector.jpg",
				validate(value){
					if(!validator.isURL(value)){
						throw new Error("Enter valid URL " +value)
					}
				}

    },
    skills :{
        type: [String],
    }
    },
    {
      timestamps : true 
    }
);

userSchema.methods.getJWT = async function  () {
    const user = this;
    const token  = await jwt.sign({_id : user._id} , "BLoop13%9");
    return token;
}

userSchema.methods.validatePass = async function(password){
    const user = this;
    const hashPass =  user.password;
    const checkPass =  await bcrypt.compare(password, hashPass);
    return checkPass;
}


const User = model("User", userSchema);

module.exports = User;