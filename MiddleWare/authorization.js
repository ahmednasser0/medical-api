import { DecodeToken } from '../utilis/GenerateTokenAndVerify.js'
import usermodel from '../DataBase/user.model.js'
export const auth=async(req,res,next)=>{
    const {authorization}=req.headers
    try {
        const {authorization}=req.headers
    if (!authorization.startsWith(process.env.BEARER)) {
        return res.json({Message:"In-valid Authorized"})
    }
    console.log({authorization});

    const token=authorization.split('Bearer ')[1]
    console.log(token);

    if (!token) {
        return res.json({Message:"There is no token"})
    }

    const decoded=DecodeToken({token , signature:process.env.TOKEN_SIGNATURE})
    console.log({decoded});
    if (!decoded?.id || !decoded?.isloggedin) {
        return res.json({Message:"in-valid Decoder"})
    }

    const authuser=await usermodel.findById(decoded.id).select("username email role")
    if (!authuser) {
        return res.json({Message:"in-valid User"})
    }
    res.json({Message:"Done",authuser})
    req.user=authuser

    return next()
    } catch (error) {
        console.log(`Error of Authorization...${error}`);
    }
}

    export default auth


    // const {authorization}=req.headers
//     console.log({authorization});
//     if (!authorization?.startsWith(process.env.BEARER)) {
//         return res.json({Message:"Not Authorized Patient"})
//     }
//     const token = authorization.split(process.env.BEARER)[1]
//     console.log(token);
//     if (!token) {
//         return res.json({Message:"There is no Token"})
//     }
//     const decoded=DecodeToken({token})
//     console.log(decoded);
//     if (!decoded?.id || !decoded.isloggedin) {
//         return res.json({Message:"Can't Decode the Token"})
//     }
//     const authuser=await usermodel.findById(decoded.id).select("username email role")
//     res.json({Message:"Done" , authuser})
//     if (!authuser) {
//         return res.json({Message:"Not Authorized Person"})
//     }
//     req.user=authuser
//     return next()