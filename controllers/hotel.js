import Hotel from "../models/Hotel.js";
import Room from "../models/Room.js";

export const createHotel = async (req,res,next) => {
    const newHotel = new Hotel(req.body);

    try {
        const savedHotel = await newHotel.save();
        res.status(200).json(savedHotel);
    }catch(err) {
        next(err);
    }
}

export const updateHotel = async (req,res,next) => {
    try {
        const updatedHotel = await Hotel.findByIdAndUpdate(
            req.params.id,
            //this is mongoDb set method  
            {$set: req.body},
            {new : true}
            );            
        res.status(200).json(updatedHotel);
    }catch(err) {
        next(err);
    }
}

export const deleteHotel = async (req,res,next) => {
    try {
        await Hotel.findByIdAndDelete(req.params.id);            
          res.status(200).json("Hotel has been Deleted");
      }catch(err) {
        next(err);
    }
}
export const getHotel = async (req,res,next) => {
    try {
        const hotelFound = await Hotel.findById(req.params.id);            
          res.status(200).json(hotelFound);
      }catch(err) {
        next(err);
    }
}

export const getAllHotel = async (req,res,next) => {
    const { min, max, ...others } = req.query;
    // const limit = req.query.limit;
    // console.log(limit);
    try {
        const allHotel = await Hotel.find({
            ...others,
            cheapestPrice: { $gt : min || 1,  $lt: max || 999},
        });            
        //  .limit(4) was used to limit in client side 
        // but also has limited in admin page while displaying list of hotels(only 4 hotels were shown)
          res.status(200).json(allHotel);
      }catch(err) {
        next(err);
    }
}
// for  Featured property
export const countByCity  = async (req,res,next) => {
    const cities = req.query.cities.split(",");
    try {
        const  list = await Promise.all(cities.map(city=>{
            // mongoDB property
            return Hotel.countDocuments({city:city});
        }))          
          res.status(200).json(list);
      }catch(err) {
        next(err);
    }
}

// for  Featured property
export const countByType  = async (req,res,next) => {
    
    try {
        // here instead of geting from query
        // we have got count one by one
        // in mongoDb they will search property without 's'
        /* but in array which we are sending as res , we want those 
           properties with 's' */
        const hotelCount = await Hotel.countDocuments({type:"hotel"});     
        const apartmentCount = await Hotel.countDocuments({type:"apartment"});
        const resortCount = await Hotel.countDocuments({type:"resort"});
        const villaCount = await Hotel.countDocuments({type:"villa"});
        const cabinCount = await Hotel.countDocuments({type:"cabin"});
        res.status(200).json([
            { type: "hotels", count: hotelCount },
            { type: "apartments" , count: apartmentCount },
            { type: "resorts" , count: resortCount },
            { type: "villas" , count: villaCount },
            { type: "cabins" , count: cabinCount },
        ]);
      }catch(err) {
        next(err);
    }
};

export const getHotelRooms = async (req,res,next) => {
    try {
        const hotel = await Hotel.findById(req.params.id);
        const list = await Promise.all(
               hotel.rooms.map((room) => {
                  return Room.findById(room);
               })     
        );
        res.status(200).json(list);
    }catch(err) {
        next(err);
    }
};