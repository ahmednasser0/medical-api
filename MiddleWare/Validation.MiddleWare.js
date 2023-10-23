const Validation=(schema)=>{
    return (req,res,next)=>{
        const ValidationResult=schema.body.validate(req.body , {abortEarly:false})
        if (ValidationResult.error) {
            return res.json({Message:"Validation Error" , ValidationResult})
        }else{
            return next()
        }
    }
}

export default Validation