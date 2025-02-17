const mongoose = require("mongoose")

const connectionRequestSchema =  new mongoose.Schema({
  fromUserId :{
    type: mongoose.Schema.Types.ObjectId,
    required : true
  },
  toUserId : {
    type: mongoose.Schema.Types.ObjectId,
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

const ConnectionRequest = new mongoose.model('ConnectionRequest', connectionRequestSchema);

module.exports = ConnectionRequest;