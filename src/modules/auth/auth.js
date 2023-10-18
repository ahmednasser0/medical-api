import { Compare, Hash } from "../../../utilis/HashAndCompare.js"
import usermodel from "../../../DataBase/user.model.js"
import { GenerateToken } from "../../../utilis/GenerateTokenAndVerify.js"
export const signup=async(req,res,next)=>{
    try {
        const {username , email , password , age , address , gender}=req.body
    const search = await usermodel.findOne({email})
    if (search) {
        return res.json({Message:"User Exist"})
    }
    const hashResult=Hash({plaintext:password})
    const user=await usermodel.create({username , email , password:hashResult , age , address , gender})
    return res.json({Message:"Done" , CreateUser:user._id})
    } catch (err) {
        console.log(`Fail to signup......${err}`);
    }
}

export const login=async(req,res,next)=>{
    try {
        const  { email , password }=req.body
    const user = await usermodel.findOne({email})
    if (!user) {
        return res.json({Message:"User not Exist"})
    }
    const match=Compare({plaintext:password , HashValue:user.password})
    if (!match) {
        return res.json({Message:"In-valid User"})
    }
const token=GenerateToken({payload:{id:user._id , isloggedin:true} , signature:process.env.TOKEN_SIGNATRUE})
return match ? res.json({Message:"Done" , token}) : res.json({Message:"Didn't Match"})

    } catch (err) {
        console.log(`Fail to signup......${err}`);
    }
}


