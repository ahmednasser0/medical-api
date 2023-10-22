export const GlobalError=(err,req,res,next)=>{
    if (err) {
        if (process.env.MOOD=='dev') {
            return res.json({Message:err.Message , err,stack:err.stack})
        }else{
            return res.status(err.cause || 500).json({Message:err.Message , err})
        }
        
    }
}