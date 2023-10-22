import Router from 'express'
import * as listController from '../user.list.js'
import auth from '../../../../MiddleWare/authorization.js'
const router=Router()

router.get('/getlist',listController.findlist)
router.post('/addlist',listController.addlist)



export default router