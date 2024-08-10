const mongoose=require("mongoose")

async function getDatabase(){
    try{
        await mongoose.connect("mongodb://localhost:27017/consagous")
        console.log("Database is connected");
        
    }
    catch(error){
        console.log("error",error);
        
    }
}
getDatabase()