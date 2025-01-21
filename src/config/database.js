const mongoose=require('mongoose');

async function connectDB(){
      await mongoose.connect('mongodb+srv://dillibabu12214:mongodbaccessgranted@cluster0.nghsbws.mongodb.net/devconnect');
}
module.exports=connectDB;

