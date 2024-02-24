import jobsmodel from "../models/jobsmodel.js";
import mongoose, { mongo } from "mongoose";
import moment from "moment"
//CREATE JOB

export const createJobController = async (req, res , next )=>{
    const {company,position} = req.body;
    if(!company || !position){
        next("please provide required fields");
    }
    req.body.createdBy = req.user.userId;
    const job = await jobsmodel.create(req.body);
    res.status(201).json({job});
};

//GET JOB

export const getAllJobsController =async (req,res,next) => {
  const {status , worktype, search,sort}= req.query;
  //condition for searching filters
  const queryObject ={
    createdBy : req.user.userId,
  };
  //logic filters
  if(status && status !== "all"){
    queryObject.status = status;
  }
  if(worktype && worktype !=="all"){
    queryObject.worktype = worktype;
  }
  if(search){
    queryObject.position = {$regex: search,$options:"i"}
  }
  let queryResult =jobsmodel.find(queryObject);
  //sorting
  if(sort === 'latest'){
    queryResult = queryResult.sort('-createdAt');
  }
  if(sort === "oldest"){
    queryResult = queryResult.sort('createdAt');
  }
  if(sort === "a-z"){
    queryResult =queryResult.sort("position");
  }
  if(sort === "z-a"){
    queryResult =queryResult.sort("-position");
  }
  //pagination
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 5;
  const skip = (page-1)*limit;

  queryResult = queryResult.skip(skip).limit(limit);
  //jobs count
  const totalJobs = await jobsmodel.countDocuments(queryResult);
  const numOfPage = Math.ceil(totalJobs/limit);

  const jobs = await queryResult;

   // const jobs = await jobsmodel.find({createdBy:req.user.userId})
    res.status(200).json({
        totalJobs,
        jobs,
        numOfPage
    });
};

//update job
export const updateJobController = async (req,res,next) =>{
    const {id} = req.params
    const {company,position}= req.body
    //validation
    if(!company || !position){
        next('please provide all required fields')
    }
    //finding jobs
    const job = await jobsmodel.findOne({_id:id})
    //validation
    if(!job){
        next(`no job found with id ${id}`)
    }
    if(!req.user.userId === job.createdBy.toString()){
     next('you are not authorized to update this job')
     return;
    }
    const updateJob = await jobsmodel.findOneAndUpdate({_id:id},req.body,{
        new:true,
        runValidators:true
    })
    //res
    res.status(200).json({updateJob});
};

//delete job
export const deleteJobController = async(req,res,next)  => {
    const{id} = req.params
    //find
    const job = await jobsmodel.findOne({_id:id})
    //validation
    if(!job){
        next(`no job found with this id ${id}`)
    }
    if(!req.user.userId === job.createdBy.toString()){
        next('you are no authorize to delete')
        return
    }
 await job.deleteOne();
 res.status(200).json({message:"success,job deleted"});
};

//job filter
export const jobStatsController = async ( req, res) => {
    const stats = await jobsmodel.aggregate([
       //search by user jobs
        {
         $match:{
            createdBy: new mongoose.Types.ObjectId(req.user.userId),
         },
        },
        {
        $group:{
            _id:'$status',count:{$sum:1},
         },
        },
    ]);

//default stats
    const defaultStats ={
        pending: stats.pending || 0,
        reject : stats.reject || 0,
        interview : stats.interview || 0 ,
    };

//yearly monthly stats
let monthlyApplication = await jobsmodel.aggregate([
        {
            $match:{
                createdBy: new mongoose.Types.ObjectId(req.user.userId)
            }
        },
        {
            $group:{
                _id:{
                    year:{$year:'$createdAt'},
                    month:{$month:'$createdAt'},
                },
                count:{
                    $sum:1,
                },
            },
        },
    ]);
    monthlyApplication = monthlyApplication.map(item =>{
        const{_id:{year,month},count}=item
        const date = moment().month(month-1).year(year).format('MMM Y')
        return{date,count};
        })
        .reverse();
    res.status(200).json({ totalJob: stats.length, defaultStats,monthlyApplication});
}; 