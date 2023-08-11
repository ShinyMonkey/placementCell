module.exports.home=function(req,res){
    // return res.send('play');
    if(req.isAuthenticated()){
        return res.redirect('/user/dashBoard');
    }
    return res.render('sign-in',{
        title: "new home",
    });
}