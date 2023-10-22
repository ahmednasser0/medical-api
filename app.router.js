import connectedDB from './DataBase/connection.js'
import UserRouter from './src/modules/user/controller/user.router.js'
import AuthRouter from './src/modules/auth/controller/auth.router.js'
import ListRouter from './src/modules/Patient List/controller/user.list.router.js'
import { GlobalError } from './MiddleWare/global.errorHandling.js'
const initApp=(app,express)=>{
    app.use(express.json({}))
app.use('/user',UserRouter)
app.use('/auth',AuthRouter)
app.use('/list',ListRouter)
app.use('/*',(req,res,next)=>{
    return res.json({Message:"Error 404"})
})
app.use(GlobalError)
    connectedDB()
}

export default initApp