//API document

import swaggerUi from 'swagger-ui-express';
import swaggerDoc from 'swagger-jsdoc';
//package
import express from "express";
import 'express-async-errors';
import dotenv from "dotenv";
import colors from "colors";
import cors from "cors";
import morgan from "morgan";
//security
import helmet from "helmet";
import xss from "xss-clean";
import MongoSanitize from "express-mongo-sanitize";
//file
import connectDB from "./config/db.js";
//route
import testRoutes from './routes/testRoutes.js';
import authRoutes from './routes/authRoutes.js';
import errorMiddleware from "./middlewares/errormiddle.js";
import jobsRoutes from './routes/jobsRoute.js';
import userRoutes from './routes/userRoutes.js';

//configure(.env)
dotenv.config();

//mongodb connect
connectDB();

//swagger api
const options ={
  definition:{
  openapi:"3.0.0",
  info:{
    title:"job portal",
    description:"node job portal",
  },
  servers:[
  {
    url:"http://localhost:8000"
  }
 ]
},
apis:['./routes/*.js'],
};

const spec = swaggerDoc(options)
//object
const app= express();

//middelware
app.use(helmet());
app.use(xss());
app.use(MongoSanitize());
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

//routes
app.use('/api/v1/test',testRoutes);
app.use('/api/v1/auth',authRoutes);
app.use("/api/v1/user",userRoutes);
app.use("/api/v1/job",jobsRoutes);

//home route
app.use("/api-doc",swaggerUi.serve,swaggerUi.setup(spec));

//validation middleware
app.use(errorMiddleware);

//port
const PORT = process.env.PORT || 8000;

//listen
app.listen(PORT, () => { 

});