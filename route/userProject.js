const express=require("express")
const { 
    createNewProject, getAllProjects, getSingleProject, updateProjectByAdmin, deleteProject,
    createNewTask,
    getTaskData
 } 
    = require("../controller/projectController")

const verifyToken=require("../middleware/verifyToken")

const router=express.Router()

router.post("/projects",verifyToken,createNewProject)
router.get("/projects",getAllProjects)
router.get("/projects/:id",getSingleProject)
router.put("/projects/:id",verifyToken,updateProjectByAdmin)
router.delete("/projects/:id",verifyToken,deleteProject)
router.post("/projects/:projectId/tasks",createNewTask)
router.get("/projects/:projectId/tasks",getTaskData)


module.exports=router