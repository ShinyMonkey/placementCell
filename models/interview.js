const mongoose=require('mongoose');

const interviewSchema=new mongoose.Schema({
    company_name:{
        type:String,
        require:true,
    },
    date:{
        type:String,
        require:true,
    },
    students:[
        {
          student: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Student",
          },
          result: {
            type: String,
            enum: ["PASS", "FAIL", "Didn't Attempt", "On Hold"],
          }
        }]
},{
    timestamp:true,
})



const Interview=mongoose.model('Interview',interviewSchema);

module.exports=Interview;