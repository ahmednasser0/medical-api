import joi from 'joi'

export const SignUpschema=joi.object({
    body:joi.object({
        username:joi.string().alphanum().min(2).max(15).required().messages({
            '"string.empty':"Username Field is Empty",
            'any.required':"Please Enter an Username",
        }),
        email:joi.string().email({minDomainSegments:2 , maxDomainSegments:3 , tlds:{allow:['com' , 'net' , 'edu' , 'eg']}}).required(),
        password:joi.string().pattern(new RegExp(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/)),
        Cpassword:joi.string().valid(joi.ref('password')).required(),
        age:joi.number().integer().min(17).max(60).required(),
        address:joi.string().required(),
        gender:joi.string().valid('male','female' , 'Male' , 'Female').required()
    })
}).required()

export const Loginschema=joi.object({
    body:joi.object({
        email:joi.string().email({minDomainSegments:2 , maxDomainSegments:3 , tlds:{allow:['com' , 'net' , 'edu' , 'eg']}}).required().messages({
            'string.pattern.base':"Password Error"
        }),
        password:joi.string()
    })
}).required()

