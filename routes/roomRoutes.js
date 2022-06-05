const { getRoom, createRoom, deleteRoom } = require('../controllers/roomControllers');
const authenticate =require('../Middleware/authenticate')

const router =require('express').Router();

router.get('/getRoom',authenticate,getRoom)
router.post('/createRoom',authenticate,createRoom)
router.delete('/deleteRoom/:id',authenticate,deleteRoom)

module.exports=router