const express=require('express');
const connectDB=require('./config/database');
const app=express();
const User=require('./models/user');

// Middleware used to convert json object into js object
app.use(express.json());

//To signup
app.post('/signup',async(req,res)=>{
    //Creating new Instance for the user
    const user=new User(req.body);
    try{
    await user.save();
    res.send("data saved successfully");
    }catch(err){
        res.status(400).send("Error Saving the user: "+err.message);
    }
});

//To get all the users
app.get('/feed',async(req,res)=>{
    const users=await User.find({});
    try{
        if(users.length===0){
           res.status(400).send("No users found");
        }else{
            res.send(users);
        }
    }catch(err){
        res.status(400).send("Something went wrong");
    }
})


//To Update the details of the user
app.patch('/user/:userId',async(req,res)=>{
    const userIdx=req.params?.userId;
    const data=req.body;
       try{
            
            const ALLOWED_UPDATES=[
                "userId",
                "photoUrl",
                "about",
                "skills",
            ];
            const isUpdateAllowed=Object.keys(data).every((k)=>{
                ALLOWED_UPDATES.includes(k)
            });
            if(!isUpdateAllowed){
                throw new Error("Update Not Allowed");
            }
            if(data?.skills.length>15){
                throw new Error("Skills cannot be more than 15");
            }
           const user=await User.findOneAndUpdate({emailId:req.body.emailId},req.body,{returnDocument:"before",runValidator:true});
        //    console.log(user);
           res.send("User Updated Succefullly");
       }catch(err){
          res.status(400).send("Something Went wrong");
       }
})
//To get the user by firstName
app.get('/user',async(req,res)=>{
    const user=await User.find({firstName:req.body.firstName});
    try{
        if(user.length===0){
            res.status(400).send("User Not found");
        }else{
            res.send(user)
        }
    }catch(err){
        res.status(400).send("Something went wrong");
    }
})

//To delete an user
app.delete('/user',async(req,res)=>{
    try{
        await User.findByIdAndDelete(req.body._id);
        res.send("Deleted User Succefully");
    }catch(err){
        res.send("Something went wrong on deleting the user");
    }
})

connectDB().then(()=>{
    console.log("Database connection established....");
    app.listen(7777,()=>{
        console.log("Server running on 7777");
    })
}).catch((err)=>{
    console.error("Database cannot be connected!!");
});

// second change

