import express from 'express';
import userAuth from '../middlewares/authmiddleware.js';
import { createJobController, deleteJobController, getAllJobsController, jobStatsController, updateJobController } from '../controllers/jobcontroller.js';

const router = express.Router();

//routes
//create job|| post
router.post('/create-job',userAuth, createJobController);


//get jobs || get
router.get('/get-job',userAuth,getAllJobsController);

//update jb
router.patch("/update-job/:id",userAuth,updateJobController);

//delete
router.delete("/delete-job/:id",userAuth,deleteJobController);

//jobs stats filter
router.get("/job-stats",userAuth,jobStatsController);

export default router;