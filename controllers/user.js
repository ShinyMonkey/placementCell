
// using user Model
const User=require('../models/user');
const Student=require('../models/student');
const Interview=require('../models/interview');



// to render the home dashBoard when signed-in
module.exports.dashBoard=async function(req,res){
    try {
        let students=await Student.find({}).populate("interviews");
        let interviews=await Interview.find({}).populate("students.student");
    // console.log(students.interviews);
    return res.render('dash_board',{
        title: "Dash-Board Page",
        students: students,
        interviews: interviews,
    });
    } catch (error) {
        console.log("Error",error);
        return;
    }
    
};

// to render the sign-in page
module.exports.signIn=function(req,res){
    if(req.isAuthenticated()){
        return res.redirect('/user/dashBoard');
    }
    return res.render('sign-in',{
        title:'Sign-in Page'
    });
};


// directing the user to employee sign-up page
module.exports.createAccount=function(req,res){
    if(req.isAuthenticated()){
        return res.redirect('/user/dashBoard');
    }
    return res.render('create-account',{
        title: "Create Account",
    });
};

// creating the emaploye profile
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
    };
    
};


// singign-in
module.exports.creatSession=function(req,res){
    return res.redirect('/user/dashboard')
}


// Signing-out
module.exports.destroysession=function(req,res){
    req.logout(function(err){
        if (err) { return next(err);
        }else{
            return res.redirect('/');
        }
});
};

// To direct the employee to the editing form
module.exports.studentsProfile=async function(req,res){
    try {
        let student= await Student.findById(req.params.id);
    if(!student){
        return console.log("No student found");
    }else{
        console.log(student);
        return res.render('edit',{
            title: "Edit Window Of the Student",
            student:student,
        });
    }
    
    } catch (error) {
        console.log('Error',error);
        return;
    };
    
};

// updating the details of the students
module.exports.update=async function(req,res){
    try {
        let student=await Student.findById(req.params.id);
        if(!student){
            return console.log("No student Found");
        }else{
            student.name=req.body.name;
            student.email=req.body.email;
            student.batch=req.body.batch;
            student.college=req.body.college;
            student.placed_status=req.body.placed_status;
            student.dsa_score=req.body.dsa_score;
            student.webd_score=req.body.webd_score;
            student.react_score=req.body.react_score;
            student.save();
            return res.redirect('back');
        }
        
    } catch (error) {
        console.log('Error',error);
        return;
    };
};


// delete the student

module.exports.destroy=async function(req,res){
    try {
        let student= await Student.findById(req.params.id);
        if(!student){
            console.log("Cant Delete");
            return res.redirect('back');
        }
        console.log(student);
        let studentsInterviews= student.interviews;
        if(studentsInterviews.length>0){
            for(interview of studentsInterviews){
                await Interview.findOneAndUpdate({
                    company_name: interview.company_name
                },{
                    $pull: { students: { student: req.params.id }  }
                });
            }
        }
        console.log(studentsInterviews)
        student.deleteOne();
        return res.redirect('back');
    } catch (error) {
        console.log('Error',error);
        return;
    };
}