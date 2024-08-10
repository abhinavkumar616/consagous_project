const mongoose=require("mongoose")

const userModelSchema=new mongoose.Schema({
    name:{
        type:String
    },
    email:{
        type:String
    },
    password:{
        type:String
    },
    role:{
        type:String,
        default:"User"
    }
})

const userModel=mongoose.model("userData",userModelSchema)
module.exports=userModel