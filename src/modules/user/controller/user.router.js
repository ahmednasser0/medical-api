import Router from 'express'
import * as UserController from '../user.js'
import auth from '../../../../MiddleWare/authorization.js'
const router=Router()

router.get('/getuser',UserController.getuser)
router.get('/profile',auth,UserController.profile)
router.put('/updateuser',auth,UserController.updateuser)
router.delete('/deleteuser',auth,UserController.deleteuser)



export default router