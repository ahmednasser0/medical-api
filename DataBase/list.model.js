import mongoose from "mongoose";
import { Schema , model  , Types} from "mongoose";
const listSchema=new Schema({
    docname:{
type:String,
required:true
    },
    illness:{
        type:String,
        required:true
    },
    discription:{
        type:String,
        required:true
    },
    medicine:{
        type:String,
        required:true
    },
    docname:{
type:String,
required:true
    },
    userid:{
type:Types.ObjectId,
ref:"patient",
required:true
    }
    },{timestamps:true}
)

const listmodel=model("Patient_List" , listSchema)
export default listmodel