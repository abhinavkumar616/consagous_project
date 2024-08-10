const projectModel = require("../model/projectModel")

const createNewProject = async (req, res) => {

    const { name, description, created_by } = req.body

    if (!name || !description || !created_by) {
        return res.status(404).send({
            message: "Kindly provide the all details"
        })
    }
    try {
        let tokendata = req.user
        console.log("tokendata", tokendata);

        if (tokendata.user.role !== "Admin") {
            return res.status(400).send({
                status: false,
                message: "You are not Authorized to create a new Project."
            })
        }
        let email = tokendata.user.email;
        // let role = tokendata.user.role

        let createData = await projectModel.create({
            name, description, created_by, created_by_email: email
        })

        return res.status(201).send({
            status: true,
            message: "Data inserted Successfully",
            data: createData
        })
    }
    catch (error) {
        return res.status(500).send({
            status: false,
            message: "Internal Server Error",
            error: error.message
        })
    }
}

const getAllProjects = async (req, res) => {
    try {
        let findData = await projectModel.find()
        console.log("findData", findData);

        return res.status(200).send({
            status: true,
            data: findData
        })

    }
    catch (error) {
        return res.status(500).send({
            status: false,
            message: "Internal Server Error",
            error: error.message
        })
    }
}

const getSingleProject = async (req, res) => {
    const { id } = req.params
    try {
        let data = await projectModel.findOne({ _id: id })
        console.log("data", data);

        if (!data) {
            return res.status(400).send({
                status: false,
                message: "Data Not Found"
            })
        }

        return res.status(200).send({
            status: true,
            data: data
        })

    }
    catch (error) {
        return res.status(500).send({
            status: false,
            message: "Internal Server Error",
            error: error.message
        })
    }

}

const updateProjectByAdmin = async (req, res) => {
    const { id } = req.params;
    const { name, description, created_by } = req.body

    if (!name || !description || !created_by) {
        return res.status(404).send({
            message: "Kindly provide the all details"
        })
    }
    try {
        let tokendata = req.user
        console.log("tokendata", tokendata);

        if (tokendata.user.role !== "Admin") {
            return res.status(400).send({
                status: false,
                message: "You are not Authorized to Update that project."
            })
        }

        if (!await projectModel.findOne({ _id: id })) {
            return res.status(404).send({
                status: false,
                message: "Id not found"
            })
        }

        let updatedata = await projectModel.updateMany({ _id: id },
            {
                $set: {
                    name: name,
                    description: description,
                    created_by: created_by
                }
            })
        console.log("updatedata", updatedata);

        return res.status(201).send({
            status: true,
            message: "Data Updated Successfully"
        })

    }
    catch (error) {
        return res.status(500).send({
            status: false,
            message: "Internal Server Error",
            error: error.message
        })
    }

}

const deleteProject = async (req, res) => {
    const { id } = req.params
    try {
        let tokendata = req.user
        console.log("tokendata", tokendata);

        if (tokendata.user.role !== "Admin") {
            return res.status(400).send({
                status: false,
                message: "You are not Authorized to Delete this project."
            })
        }

        if (!await projectModel.findOne({ _id: id })) {
            return res.status(404).send({
                status: false,
                message: "Id not found"
            })
        }

        let deleteData = await projectModel.deleteOne({ _id: id })
        console.log("deleteData", deleteData);

        return res.status(200).send({
            status: true,
            message: "Data deleted Successfully"
        })
    }

    catch (error) {
        return res.status(500).send({
            status: false,
            message: "Internal Server Error",
            error: error.message
        })
    }
}

const createNewTask=async(req,res)=>{

    const{projectId}=req.params
    console.log("projectId",projectId);
    
    const{title,description,assigned_to,status,due_date,project_reference}=req.body
    console.log("req.body",req.body);

    try{

        if (!await projectModel.findOne({ _id: projectId })) {
            return res.status(404).send({
                status: false,
                message: "Id not found"
            })
        }
 
        let pushdata={
            title:title,
            description:description,
            assigned_to:assigned_to,
            status:status,
            project_reference:project_reference,
            due_date:due_date
        }   

        console.log("pushdata",pushdata);

        let data=await projectModel.updateOne({_id:projectId},{$set:{task:pushdata}})
        console.log("data-------------",data);
        
        return res.status(201).send({
            status:true,
            message:"Data Inserted Successfully",
            data:data
        })
    }
    catch (error) {
        return res.status(500).send({
            status: false,
            message: "Internal Server Error",
            error: error.message
        })
    }

}

const getTaskData=async(req,res)=>{
    const {projectId}=req.params

    try{

       let findData = await projectModel.findOne({ _id: projectId })
            
        if(!findData){
            return res.status(404).send({
                status: false,
                message: "Id not found"
            })
        }

        return res.status(200).send({
            status:true,
            data:findData
        })
    }
    catch (error) {
        return res.status(500).send({
            status: false,
            message: "Internal Server Error",
            error: error.message
        })
    }
}


module.exports = {
    createNewProject,
    getAllProjects,
    getSingleProject,
    updateProjectByAdmin,
    deleteProject,
    createNewTask,
    getTaskData,
}