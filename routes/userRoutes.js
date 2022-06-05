const { register, login } = require('../controllers/userControllers');

const router =require('express').Router();

router.post('/signup',register)
router.post('/login',login)

module.exports=router