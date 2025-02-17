const validator = require("validator");

const validateSignupData = (req) => {
  const {firstName, lastName, emailId ,password} = req.body;

  if(!firstName || !lastName || !emailId || !password){
    throw new Error("Please provide all the details");
  }
  else if(!validator.isEmail(emailId)){
    throw new Error("Please provide a valid email");
  }
  else if(!validator.isStrongPassword(password)){
    throw new Error("Pass is too weak");
  }
}

const validateEditProfileData = (req) =>{
  const allowedFields = ["firstName" , "lastName", "about" , "photoUrl", "skills"];

  const isValidRequest = Object.keys(req.body).every((key) => {
      return allowedFields.includes(key);
  });

  return isValidRequest;
}

module.exports = {
  validateSignupData,
  validateEditProfileData
};