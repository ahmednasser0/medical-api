import { Compare, Hash } from "../../../utilis/HashAndCompare.js"
import usermodel from "../../../DataBase/user.model.js"
import { GenerateToken } from "../../../utilis/GenerateTokenAndVerify.js"
import AsyncHandler from "express-async-handler"
import {
	ReasonPhrases,
	StatusCodes,
	getReasonPhrase,
	getStatusCode,
} from 'http-status-codes';
import {  Loginschema, SignUpschema } from "../../../MiddleWare/Validation.js";
export const signup=async(req,res,next)=>{
    try {
        const ValidationResult=SignUpschema.validate(req.body , {abortEarly:false})
        if (ValidationResult.error) {
            return res.json({Message:"Validation Error" , ValidationResult})
        }
        const {username , email , password , age , address , gender}=req.body
    const search = await usermodel.findOne({email})
    if (search) {
        return next(new Error('Email Exist',{cause:StatusCodes.CONFLICT}))
    }
    const hashResult=Hash({plaintext:password})
    const user=await usermodel.create({username , email , password:hashResult , age , address , gender})
    return res.status(201).json({Message:"Done" , CreateUser:user._id})
    } catch (err) {
        console.log(`Fail to signup......${err}`);
    }
}

export const login=AsyncHandler( async(req,res,next)=>{
        const  { email , password }=req.body
    const user = await usermodel.findOne({email})
    if (!user) {
        // return res.json({Message:"User not Exist"})
        return next(new Error('User not Exist'))
    }
    const match=Compare({plaintext:password , HashValue:user.password})
    if (!match) {
        // return res.json({Message:"In-valid User"})
        return next(new Error('In-valid User'))
    }
const token=GenerateToken({payload:{id:user._id , isloggedin:true} , signature:process.env.TOKEN_SIGNATRUE})
return match ? res.json({Message:"Done" , token}) : res.json({Message:"Didn't Match"})

    
})


