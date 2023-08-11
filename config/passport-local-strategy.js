const passport=require('passport');
const User=require('../models/user');
const passportlocal=require('passport-local').Strategy;

passport.use(new passportlocal({
    usernameField:'email',
    passReqToCallback:true,
},function(req,email,password,done){
    User.findOne({email:email}).then(function(user){
        if(!user || user.password!= password){
            console.log('User Not Found');
            return done(null,false)
        }else{
            console.log('User Found');
            // console.log(req.body.password);
            // console.log(password);
            return done(null,user);
        }
    });
}
));


// serialize 
passport.serializeUser(function(user,done){
    console.log(user.id);
    console.log(user._id);
    return done(null,user.id);
})

// deserialize
passport.deserializeUser(function(id,done){
    User.findById(id).then(function(user){
        return done(null,user);
    })
})



// check id ther user is authenciated
passport.checkAuthentication=function(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }

    return res.redirect('/user/sign-in');
}


passport.setAuthenticateUser=function(req,res,next){
    if(req.isAuthenticated()){
        res.locals.user=req.user;
    }
    next();
}

module.exports=passport;