const express=require('express');
const router=express.Router();
const passport=require('passport');
const interviewController=require('../controllers/interviews_controller');


router.get('/add-interview',passport.checkAuthentication,interviewController.addInterview);
router.post('/addInterview',passport.checkAuthentication,interviewController.creat);
router.post('/allocation/:id',passport.checkAuthentication,interviewController.allocateInterview)
router.get('/de-allocation/:interviewId/:studentId',passport.checkAuthentication,interviewController.deAllocation)


module.exports=router;