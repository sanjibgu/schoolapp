const mongoose=require("mongoose");

const connectDB=async(DATABASE_URL)=>{
    try {
        const DB_OPTIONS={dbName:"scholl310123"}
        mongoose.set("strictQuery", false);
        await mongoose.connect(DATABASE_URL,DB_OPTIONS);
        console.log("Database Connecion Successful");
    } catch (error) {
        console.log(error)
    }
}


module.exports=connectDB;