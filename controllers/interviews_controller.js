const Interview=require('../models/interview');
const Student = require('../models/student');


module.exports.addInterview=function(req,res){
    return res.render('add_interview',{
        title:"Add Interview",
    })
}


module.exports.creat= async function(req,res){
    try {
        await Interview.create(req.body);
        return res.redirect('/user/dashboard')
    } catch (error) {
        console.log('Error:',error);
        return;
    }
}

module.exports.allocateInterview= async function(req,res){
    try {
        let interview= await Interview.findById(req.params.id);
        if(interview){
            let student=await Student.findOne({email:req.body.email});
            console.log(student)
            if(student){
                // is student already enrolled for the company
                let isStudent=await Interview.findOne({"students.student": student.id});
                if(isStudent){
                    if(isStudent.company_name == interview.company_name){
                        return res.redirect('back');
                    }
                    // console.log(isStudent.company_name == interview.company_name)
                }
                let interviewStudent={
                    student:student.id,
                    result:req.body.result,
                }

                // updating the students in interview
                await interview.updateOne({
                    $push:{students:interviewStudent}
                });

                 // updatind interview in student
                let studentInterview={
                    company_name:interview.company_name,
                    date:interview.date,
                    result:req.body.result,
                }
                await student.updateOne({$push:{interviews:studentInterview}});
                req.flash('success','Interview Allocated Successfully');
                return res.redirect('back');
            }
            return res.redirect('back');

            
        }
 
            return res.redirect('back');

    } catch (error) {
        console.log('Error:',error);
        return;
    }
}



module.exports.deAllocation= async function(req,res){
    try {
        const interview= await Interview.findById(req.params.interviewId);

        if(interview){


            // removing the reference of the interviews in students
            await Student.findOneAndUpdate({_id:req.params.studentId},
                {$pull:{interviews:{company_name:interview.company_name}}
            })
            

            // removing the reference of the student in interviews
            await Interview.findOneAndUpdate({_id:req.params.interviewId},{
                $pull:{students:{student: req.params.studentId}}
            })
            req.flash('success','Student Removed From An Interview');
            return res.redirect('back');
        }
        return res.redirect('back');
    } catch (error) {
        console.log('Error:',error);
        return;
    }
}