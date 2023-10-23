import usermodel from "../../../DataBase/user.model.js"
export const getuser=async(req,res,next)=>{
    const user =await usermodel.find()
    return res.json({Message:"Done",user})
}

export const profile=async(res,req,next)=>{
    try {
    const user=await usermodel.findById(req.user._id)
    if (!user) {
        return res.json({Message:"in-valid User"})
    }
    return res.json({Message:"Done" , user})
    } catch (err) {
        console.log(`Error of Profile......${err}`);
    }
}

export const updateuser=async(req,res,next)=>{
    try {
        const search=await usermodel.findById(req.user._id)
        if (!search) {
            return res.json({Message:"There is no user"})
        }
        const {username , email , password , age , address , gender}=req.body
        const user=await usermodel.findByIdAndUpdate(req.user._id , req.body , {new:true})
        return user ? res.json({Message:"Done" , user}) : res.json({Message:"in-valid user"})
    } catch (error) {
        console.log(`Fail of update.......${error}`);
    }
}

export const deleteuser=async(req,res,next)=>{
    try {
        const search=await usermodel.findById(req.user._id)
        if (!search) {
            return res.json({Message:"There is no user"})
        }
        const user=await usermodel.findByIdAndDelete(req.user._id)
        return user ? res.json({Message:"Done" , user}) : res.json({Message:"in-valid user"})
    } catch (error) {
        console.log(`Fail of update.......${error}`);
    }
}