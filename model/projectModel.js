const mongoose=require("mongoose")

const projectModelSchema=new mongoose.Schema({
    name:{
        type:String
    },
    description:{
        type:String
    },
    created_by:{
        type:String
    },
    created_by_email:{
        type:String
    },
    task:{
        type:Array
    }
})

const projectModel=mongoose.model("project",projectModelSchema)
module.exports=projectModel