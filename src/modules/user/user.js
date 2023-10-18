import usermodel from "../../../DataBase/user.model.js"
export const getuser=async(req,res,next)=>{
    const user =await usermodel.find()
    return res.json({Message:"Done",user})
}

export const profile=async(res,req,next)=>{
    try {
        console.log({user:req.user});
    const user=await usermodel.findById(req.user._id)
    return res.json({Message:"Done" , user})
    } catch (err) {
        console.log(`Error of Profile......${err}`);
    }
}