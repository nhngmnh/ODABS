import jwt from 'jsonwebtoken'
// user authenication middleware
const authDoctor= async(req,res,next)=>{
    try {
        const {dtoken}=req.headers
        if(!dtoken){
            return res.json({success:false,message:'Not Authorized Login Again'+dtoken+"df"})
        }
        const token_decode=jwt.verify(dtoken,process.env.JWT_SECRET)
        req.body.docId=token_decode.id
        next()
    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }

}
export default authDoctor