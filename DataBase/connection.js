import mongoose from "mongoose"
const connectedDB=async()=>{
    return await mongoose.connect(process.env.CONNECTION).then(result=>{
        console.log('connected DB.........');
    }).catch(err=>{
        console.log(`Fail of connection////////${err}`);
    })
}

export default connectedDB