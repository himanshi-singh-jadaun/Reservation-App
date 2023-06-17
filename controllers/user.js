import User from "../models/User.js";

export const updateUser = async (req,res,next) => {
    try {
        const updatedUser = await Hotel.findByIdAndUpdate(
            req.params.id,
            //this is mongoDb set method  
            {$set: req.body},
            {new : true}
            );            
        res.status(200).json(updatedUser);
    }catch(err) {
        next(err);
    }
}

export const deleteUser = async (req,res,next) => {
    try {
        await User.findByIdAndDelete(req.params.id);            
          res.status(200).json("User has been Deleted");
      }catch(err) {
        next(err);
    }
}
export const getUser = async (req,res,next) => {
    try {
        const userFound = await User.findById(req.params.id);            
          res.status(200).json(userFound);
      }catch(err) {
        next(err);
    }
}

export const getAllUser = async (req,res,next) => {
    try {
        const allUser = await User.find();            
          res.status(200).json(allUser);
      }catch(err) {
        next(err);
    }
}