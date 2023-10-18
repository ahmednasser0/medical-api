import jwt from 'jsonwebtoken'
export const GenerateToken=({payload="" , signature=process.env.TOKEN_SIGNATURE , expiresIn=60*60*24*30}={})=>{
    const token=jwt.sign(payload , signature , {expiresIn:parseInt(expiresIn)})
    return token
}

export const DecodeToken=({token, signature=process.env.TOKEN_SIGNATURE }={})=>{
    const decode=jwt.verify({token , signature })
    return decode
}