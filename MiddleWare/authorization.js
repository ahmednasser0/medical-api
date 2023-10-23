import { DecodeToken } from '../utilis/GenerateTokenAndVerify.js'
import usermodel from '../DataBase/user.model.js'
export const auth=async(req,res,next)=>{
    
    try {
        const {authorization}=req.headers
    if (!authorization?.startsWith(process.env.BEARER)) {
        return res.json({Message:"In-valid Authorized"})
    }
    // console.log({authorization});

    const token=authorization.split('Bearer ')[1]
    // console.log(token);

    if (!token) {
        return res.json({Message:"Token Error"})
    }

    const decoded=DecodeToken({token , signature:process.env.TOKEN_SIGNATURE})
    console.log({decoded});
    if (!decoded?.id || !decoded?.isloggedin) {
        return res.json({Message:"in-valid Decoder"})
    }

    const authuser=await usermodel.findById(decoded.id)
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


    