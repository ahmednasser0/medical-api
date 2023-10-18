import connectedDB from './DataBase/connection.js'
import UserRouter from './src/modules/user/controller/user.router.js'
import AuthRouter from './src/modules/auth/controller/auth.router.js'
const initApp=(app,express)=>{
    app.use(express.json({}))
app.use('/user',UserRouter)
app.use('/auth',AuthRouter)
    connectedDB()
}

export default initApp