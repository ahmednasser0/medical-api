import bcrypt from 'bcryptjs'
export const Hash=({plaintext="" , saltRound=process.env.SALT_ROUND}={})=>{
    const hashResult=bcrypt.hashSync(plaintext , parseInt(saltRound))
    return hashResult
}

export const Compare=({plaintext="" , HashValue=""}={})=>{
    const match=bcrypt.compareSync(plaintext , HashValue)
    return match
}