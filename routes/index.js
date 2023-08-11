const express=require('express');
const router=express.Router();
const home=require('../controllers/home');

console.log('Router online')

router.get('/',home.home);
router.use('/user',require('./user'));

module.exports=router;