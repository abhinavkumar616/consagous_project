const userModel=require("../model/userModel")
const jwt=require("jsonwebtoken")


const registerUser=async(req,res)=>{

    const {name,email,password,role}=req.body

    if(!name || !email || !password || !role){
        return res.status(400).send({
            message:"Kindly Provide the all fields"
        })
    }
    try{
        if(await userModel.findOne({email:email})){
            return res.status(409).send({
                message:"Email Id is already available"
            })
        }

        let data=await userModel.create({
            name,email,password,role
        })

        return res.status(201).send({
            status:true,
            message:"User Registered Sucessfully",
            data:data
        })

    }
    catch(error){
        return res.status(500).send({
            status:false,
            message:"Internal Server Error",
            error:error.message
        })
    }

}

const loginUser=async(req,res)=>{
    const {email,password}=req.body

    if(!email || !password){
        return res.status(400).send({
            message:"Kindly Provide the all fields"
        })
    }
    try{
        let findemail=await userModel.findOne({email:email})
        if(!findemail){
            return res.status(404).send({
                message:"Email Id not found"
            })
        }

        console.log("findemail",findemail);

        if(findemail.password !== password){
            return res.status(400).send({
                message:"password not matched"
            })
        }

        // let data=findemail._id
        // console.log("data",data);
        
        let token=jwt.sign({
            exp:Math.floor(Date.now()/1000 + (60*60)),
            user:findemail
        },"secret")

        return res.status(200).send({
            status:true,
            message:"User LoggedIn successfully",
            token:token
        })
    }
    catch(error){
        return res.status(500).send({
            status:false,
            message:"Internal Server Error",
            error:error.message
        })
    }
}

module.exports={
    registerUser,
    loginUser
}