const mongoose = require("mongoose")

const connectionRequestSchema =  new mongoose.Schema({
  fromUserId :{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required : true
  },
  toUserId : {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  status:{
    type: String,
    enum : {
      values : ["interested", "ignored", "accepted", "rejected"],
      message: `{VALUES} is incorrect type!`
    },
    required: true
  }
},{
  timestamps: true
});

connectionRequestSchema.index({fromUserId:1, toUserId:1});

connectionRequestSchema.pre("save", function (next){
  const connectionRequest = this;

  if(connectionRequest.fromUserId.equals(connectionRequest.toUserId)){
    throw new Error ("You cannot send request to yourself!");
  }
  next();
})

const ConnectionRequest = new mongoose.model('ConnectionRequest', connectionRequestSchema);

module.exports = ConnectionRequest;