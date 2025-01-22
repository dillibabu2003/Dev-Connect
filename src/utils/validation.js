const validator=require("validator");
// const { default: isEmail } = require("validator/lib/isEmail");

const validateSignUpData=(req)=>{
      const {firstName,lastName,password,emailId}=req;
      if(!firstName || !lastName){
        throw new Error("Not a valid name");
      }
      if(!validator.isStrongPassword(password)){
        throw new Error("The Password is not strong enough");
      }
      if(!validator.isEmail(emailId)){
        throw new Error("Not a valid Email Id");
      }
}

module.exports={validateSignUpData}