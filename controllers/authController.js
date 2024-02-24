import userModel from "../models/usermodel.js";

export const registerController =async (req ,res , next) => {
    const {name,email,password} = req.body;

    //validate
    if(!name){
       next('name is required');
    }
    if(!email){
       next("email is required");
    }
    if(!password){
        next("password is required");
    }
    const existingUser =await userModel.findOne({email});
    if(existingUser){
        next("email is already register please login with another email");
    
    }
    const user = await userModel.create({name,email,password});
    //token
    const token = user.createJWT();
    res.status(201).send({
        sucess:true,
        message:"user created successfully",
        user:{
            name:user.name,
            lastname:user.lastname,
            email:user.email,
            location:user.location,
        },
        token,
    });
};

export const loginController = async (req,res, next) =>{
    const {email,password} = req.body;
    
    //validation
    if(!email || !password){
        next('please provide required fields');
    }
    //find by email
    const user = await userModel.findOne({email}).select("+password");      //+(for hiding password hide)
    if(!user){
        next('invalid username or password');
    }
    //compare password
    const isMatch = await user.comparePassword(password);
    if(!isMatch){
        next('invalid username or password');
    }
    user.password = undefined;
    const token = user.createJWT()
    res.status(200).json({
        success:true,
        message:'login successfully',
        user,
        token,
    });
};