const express=require('express');
const router=express.Router();
const userController=require('../controllers/user');
const passport=require('passport');


router.get('/sign-in',userController.signIn);
router.get('/create-account',userController.createAccount);
router.post('/Create',userController.create);
router.post('/creatSession',passport.authenticate('local',{failureRedirect:"/user/sign-in"}),userController.creatSession);
router.get('/dashBoard',passport.checkAuthentication,userController.dashBoard);
router.get('/sign-out',userController.destroysession);
router.get('/students-profile/:id',passport.checkAuthentication,userController.studentsProfile);
router.post('/update/:id',passport.checkAuthentication,userController.update);
router.get('/destroy/:id',passport.checkAuthentication,userController.destroy);
router.get('/downloadCSV',passport.checkAuthentication,userController.downloadCSV)
module.exports=router;