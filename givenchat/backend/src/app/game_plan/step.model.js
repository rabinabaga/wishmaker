const mongoose = require('mongoose')
const StepSchema = new mongoose.Schema({ 
    step_title: String,
    order_number:{
        type: Number,
        required:false,
        default:0
    }, 
    status:{
        type:String,
        enum:['untouched',"active","completed"],
        default:"untouched",
        required:true
    }
 },{
    autoCreate:true,
    autoIndex:true,
    timestamps:true
 });


const StepModel = mongoose.model("Step", StepSchema)
module.exports = StepModel;