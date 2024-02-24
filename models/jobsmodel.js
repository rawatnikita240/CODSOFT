import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
 company:{
    type:String,
    required:[true,'company name'],
 },
 position:{
     type:String,
     required:[true,'postion is required'],
     maxlength:100,
 },
 status:{
    type:String,
    enum:['pending','reject','interview'],
    default:'pending',
 },
 workType:{
    type:String,
    enum:['full-time','part-time','internship'],
    default:'full-time',
 },
 workLocation:{
    type:String,
    default:'Delhi',
    required:[true,'mention your worklocation'],
 },
 createdBy:{
    type: mongoose.Types.ObjectId,
    ref:'User'
 }

},{timestamps:true}
);

export default mongoose.model('job', jobSchema);