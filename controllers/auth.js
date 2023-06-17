import User from "../models/User.js";
import bcrypt from "bcryptjs";
import { createError } from "../utils/error.js";
import jwt from "jsonwebtoken";

export const register = async (req,res,next) => {
    try {
        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(req.body.password,salt);


        const newUser = new User({
            ...req.body,
            password: hashedPassword,
        });

        await newUser.save();
        res.status(200).send("User has been created");
    }catch(err) {
        next(err);
    }
}

export const login = async (req,res,next) => {
    try {
        const userFound = await User.findOne({username:req.body.username});
        if(!userFound) return next(createError(404,"User not found!"));
        
        const isPasswordCorrect = await bcrypt.compare(req.body.password,userFound.password);
        if(!isPasswordCorrect) return next(createError(400,"Wrong Password!"));
        
        const token = jwt.sign(
            { id: userFound._id, isAdmin: userFound.isAdmin },
                process.env.JWT_SECRET_KEY
            );

        // this is done to avoid showing of hashedpassword
        // and isAdmin from getting to client side as a response 
        const {password, isAdmin, ...otherDetails} = userFound._doc;
        // those details are inside _doc property of response
        res.cookie("access_token",token,{
            httpOnly: true,
        })
        .status(200)
        .json({details : {...otherDetails}, isAdmin});
    }catch(err) {
        next(err);
    }
}