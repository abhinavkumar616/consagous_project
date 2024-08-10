const express=require("express")
require("./config/db_connect")

const userRouter=require("./route/userRoute")
const projectRouter=require("./route/userProject")

const app=express()

app.use(express.json())
app.use("/",userRouter)
app.use("/",projectRouter)

const port=3000

app.listen(port,()=>{
    console.log(`server is running on port ${port}`);
})