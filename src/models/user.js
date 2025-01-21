const mongoose=require('mongoose');
const validator=require('validator');

const userSchema=new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
        minLength:4,
        maxLength:50,
    },
    lastName:{
        type:String,
    },
    emailId:{
        type:String,
        lowercase:true, // whatever the user type, it will convert it into lowercase
        required:true,
        unique:true,
        trim:true,     // will remove the unnecessary spaces at the beginning and the end
        validator(value){
            if(!validator.isEmail(value)){
                throw new Error("Invalid Email Id");
            }
        }
    },
    password:{
        type:String,
        required:true,
        validator(value){
            if(!validator.isStrongPassword(value)){
                throw new Error("PassWord is not strong enoughs");
            }
        }
    },
    age:{
        type:Number,
        min:18,
    },
    gender:{
        type:String,
        validate(value){                                        // by default the validate funcion will be called only during
            if(!["male","female","others"].includes(value)){    //the new insertion of the document, it will not be called for updates.
                throw new Error("Gender data in not Valid");    //inOrder to do that we have to enable run validator in the patch api
            }
        }
    },
    photoUrl:{
        type:String,
        validate(value){
            if(!validator.isURL(value)){
                throw new Error("Invalid Photo URL");
            }
        }
    },
    about:{
        type:String,
        default:"Default Description Update it!!"
    },
    skills:{
        type:[String]
    }
},{
    timestamps:true                 // to insert date and time along with the document which has the inserted time and 
})                                  // last updated time

const User=mongoose.model("User",userSchema);
module.exports=User;