const mongoose=require('mongoose');

const studentSchema=new mongoose.Schema({
    name:{
        type:String,
        require:true,
    },
    email:{
        type:String,
        require:true

    },
    batch:{
        type:String,
        require:true,
    },
    college:{
        type:String,
        require:true,
    },
    dsa_score:{
        type:Number,
        require:true,
    },
    webd_score:{
        type:Number,
        require:true,
    },
    react_score:{
        type:Number,
        require:true,
    },
    placed_status:{
        type:String,
        enum:['Placed','Not Placed'],
        require:true,
    },
    interviews:[{
        company_name: {
            type: String,
            required: true,
          },
          date: {
            type: String,
            required: true,
          },
        result: {
          type: String,
          enum: ["PASS", "FAIL", "Didn't Attempt", "On Hold"],
        }
      }]
    
},{
    timestamp:true,
});


const Student=mongoose.model('Student',studentSchema);

module.exports=Student;