import express from "express";
import {testPostController} from "../controllers/testController.js";
import userAuth from "../middlewares/authmiddleware.js";

const router = express.Router();

//router 
router.post("/test-post",userAuth,testPostController);

//export 
export default router;