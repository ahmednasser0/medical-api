const DataMethods=['body' , 'query' , 'params' , 'headers']
const Validation=(schema)=>{
    return (req,res,next)=>{
        const validationarr=[]
        DataMethods.forEach(key=>{
if (schema[key]) {
    const ValidationResult=schema[key].validate(req[key] , {abortEarly:false})
    if (ValidationResult.error) {
        validationarr.push(ValidationResult.error.details)
    }
}
        })

        if (validationarr.length > 0) {
            return res.json({Message:"Validation Error" , validationarr})
        }else{
            return next()
        }
    }
}

export default Validation


// return (req,res,next)=>{
//     const ValidationResult=schema.body.validate(req.body , {abortEarly:false})
//     if (ValidationResult.error) {
//         return res.json({Message:"Validation Error" , ValidationResult})
//     }else{
//         return next()
//     }
// }