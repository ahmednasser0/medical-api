import Router from 'express'
import * as AuthController from '../auth.js'
import auth from '../../../../MiddleWare/authorization.js'
const router = Router()

router.post('/signup',AuthController.signup)
router.post('/login' , AuthController.login)





export default router