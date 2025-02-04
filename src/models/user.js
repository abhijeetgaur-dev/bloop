const mongoose = require("mongoose");
const {Schema, model} = mongoose;

const userSchema = new Schema ({
    firstName:{
        type: "string"
    },
    lastName:{
        type: "string"
    },
    emailId:{
        type: "string"
    },
    password :{
        type: "string"
    },
    age : {
        type: "number"
    },
    gender: {
        type: "string"
    }
});

const UserModel = model("user", userSchema);

module.exports = UserModel;