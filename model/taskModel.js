const mongoose=require("mongoose")

const taskModelSchema=new mongoose.Schema({
    title:{
        type:String
    },
    description:{
        type:String
    },
    assigned_to:{
        type:String
    },
    status:{
        type:String
    },
    due_date:{
        type:Date,
        default:Date.now()
    },
    project_reference:{
        type:String
    },

})

const taskModel=mongoose.model("Task",taskModelSchema)
module.exports=taskModel