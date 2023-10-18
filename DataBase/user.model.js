import mongoose from "mongoose";
import { Schema , model } from "mongoose";
const userSchema=new Schema({
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    age:Number,
    address:String,
    gender:{
        type:String,
        default:'Male',
        enum:['male' , 'female' , 'Male' , 'Female']
    }

} , {timestamps:true})

const usermodel= model('patient' , userSchema)
export default usermodel