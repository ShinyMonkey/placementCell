// using user Model
const User=require('../models/user');

module.exports.dashBoard=function(req,res){
    return res.render('dash_board',{
        title: "Dash-Board Page",
    })
}

module.exports.signIn=function(req,res){
    if(req.isAuthenticated()){
        return res.redirect('/user/dashBoard');
    }
    return res.render('sign-in',{
        title:'Sign-in Page'
    });
}



module.exports.createAccount=function(req,res){
    if(req.isAuthenticated()){
        return res.redirect('/user/dashBoard');
    }
    return res.render('create-account',{
        title: "Create Account",
    })
}


module.exports.create=async function(req,res){
    try {
        if(req.body.password != req.body.conferm_password){
            console.log('MishMatch');
            return res.redirect('back');
        }
        let user=await User.findOne({email:req.body.email});
        if(!user){
            User.create(req.body);
            res.redirect('/user/sign-in');
        }else{
            return res.redirect('back');
        }
    } catch (error) {
        console.log('Error',error);
        return;
    }
    
    // console.log(req.body.password == req.body.conferm_password);
}

module.exports.creatSession=function(req,res){
    return res.redirect('/user/dashboard')
}