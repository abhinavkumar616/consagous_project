const jwt=require("jsonwebtoken")

const authenticateToken=async(req,res,next)=>{

    const token=req.headers["authorization"]

    if(!token){
        return res.status(404).send({
            message:"Token not found"
        })
    }
    jwt.verify(token,"secret",(err,result)=>{
        if(err){
            return res.status(403).send({
                message:"token not valid"
            })
        }
        req.user=result
        next()
    })
}

module.exports=authenticateToken