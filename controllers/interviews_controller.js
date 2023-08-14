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
                    console.log('yes');
                    return res.redirect('back');
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

                return res.redirect('back');
            }
            return res.redirect('back');

            
        }
        
        // if(student){
            // is student already enrolled for the company
            // let isStudent=await Interview.findOne({"students.student": student.id});
            // if(isStudent){
            //     return res.redirect('back');
            // }

            // let interviewStudent={
            //     student:student.id,
            //     result:result,
            // }

            // updating the students in interview
            // await Interview.updateOne({students:interviewStudent});

            // updatind interview in students student
            // let studentInterview={
            //     Interview:req.params.id,
            //     result:req.body,result,
            // }
            // await Student.updateOne({interviews:studentInterview});
            return res.redirect('back');

        // }
    } catch (error) {
        console.log('Error:',error);
        return;
    }
}

