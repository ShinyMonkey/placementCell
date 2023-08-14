const express=require('express');
const router=express.Router();
const studentController=require('../controllers/student_controller');
const passport=require('passport');


router.get('/add-students',passport.checkAuthentication,studentController.addStudent)
router.post('/addstudent',studentController.create)
module.exports=router;