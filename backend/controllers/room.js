import Room from "../models/Room.js";
import Hotel from "../models/Hotel.js";
// import { createError } from "../utils.js";

export const createRoom = async (req,res,next) => {
    const hotelId = req.params.hotelid;
    const newRoom = new Room(req.body);

    try{
        const savedRoom = await newRoom.save();
        try {
            await Hotel.findByIdAndUpdate(hotelId, {
                $push : {rooms: savedRoom._id},
            });
        }catch(err) {
            next(err);
        }
       res.status(200).json(savedRoom);
    }catch(err) {
        next(err);
    }
} 

export const updateRoom = async (req,res,next) => {
    try {
        const updatedRoom = await Room.findByIdAndUpdate(
            req.params.id,
            //this is mongoDb set method  
            {$set: req.body},
            {new : true}
            );            
        res.status(200).json(updatedRoom);
    }catch(err) {
        next(err);
    }
}

export const updateRoomAvailability = async (req,res,next) => {
    try {
        await Room.updateOne (
            { "roomNumbers._id" : req.params.id },
            {
               $push : {
                // this is method to update nested things in monogoDb
                  "roomNumbers.$.unavailableDates" : req.body.dates
               },
            }
        );
        res.status(200).json("Room status has been updated");
    }catch(err) {
        next(err);
    }
};

export const deleteRoom = async (req,res,next) => {
    const hotelid = req.params.hotelid;
    try {
        await Room.findByIdAndDelete(req.params.id);
        // whenevr we delete any room then update the hotel
        try {
            await Hotel.findByIdAndUpdate(hotelid, {
                $pull : {rooms: req.params.id},
            });
        }catch(err) {
            next(err);
        }            
          res.status(200).json("Room has been Deleted");
      }catch(err) {
        next(err);
    }
}
export const getRoom = async (req,res,next) => {
    try {
        const roomFound = await Room.findById(req.params.id);            
          res.status(200).json(roomFound);
      }catch(err) {
        next(err);
    }
}

export const getAllRoom = async (req,res,next) => {
    try {
        const allRoom = await Room.find();            
          res.status(200).json(allRoom);
      }catch(err) {
        next(err);
    }
}