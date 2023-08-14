const express=require('express');
const router=express.Router();
const home=require('../controllers/home');

console.log('Router online')

router.get('/',home.home);
router.use('/user',require('./user'));
router.use('/student',require('./students'));
router.use('/interview',require('./interview'));
module.exports=router;