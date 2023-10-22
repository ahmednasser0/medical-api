import listmodel from "../../../DataBase/list.model.js"
import usermodel from "../../../DataBase/user.model.js";
export const findlist=async(req,res)=>{
    try {
        const list =await listmodel.find().populate({
            path:"userid",
            select:"-password"
        })
        list ? res.json({Message:"Done" , list}) : res.json({Message:"in-valid list"})
    } catch (error) {
        console.log(`Fail of Find......${error}`);
    }
}

export const addlist=async(req,res,next)=>{
    const {illness , discription , medicine , docname, userid}=req.body
    const user = await usermodel.findById(userid)
    if (!user) {
        return res.json({Message:"In-valid user"})
    }
    
    const list=await listmodel.create({illness , discription , medicine , docname, userid})
    return list ? res.json({Message:"Done" , list}) : res.json({Message:"in-valid List" })
}

export const deletelsit=async(req,res,next)=>{
    
}
