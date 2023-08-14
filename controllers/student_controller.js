const Student=require('../models/student');

module.exports.addStudent=function(req,res){
    if(req.isAuthenticated()){
        return res.render('add_student',{
            title: 'Add Student Dash-Board',
            
        })
    }
    return res.redirect('/');
}


module.exports.create=async function(req,res){
    console.log(req.body);
    try {
        let student= await Student.findOne({email:req.body.email})

    if(!student){
        await Student.create(req.body);
        return res.redirect('/user/dashboard');
    }else{
        return res.redirect('back')
    }

    } catch (error) {
        console.log('Error While Creating A Student Form:', error);
        return;
    }
    

}