import express from "express";
import dotenv from "dotenv";
import mongoose from 'mongoose';
import authRoute from "./routes/auth.js";
import usersRoute from "./routes/users.js";
import hotelsRoute from "./routes/hotels.js";
import roomsRoute from "./routes/rooms.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import morgan from  "morgan";
import path from "path";
import colors from "colors";

const PORT = process.env.PORT || 5000;

const app = express();

dotenv.config()

const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log("connected to mongodb");
    }catch(error) {
       throw error;
    }
};

mongoose.connection.on("disconnected",()=> {
    console.log("mongodb disconnected");
})

//middlewares
app.use(cors()); // to connect to backend
app.use(cookieParser());
app.use(express.json());

if(process.env.NODE_ENV==='development'){
    app.use(morgan('dev'));
}

app.use("/auth",authRoute);
app.use("/users",usersRoute);
app.use("/hotels",hotelsRoute);
app.use("/rooms",roomsRoute);

if(process.env.NODE_ENV==='production'){
    app.use(express.static('frontend/build'));

    app.get('*', (req,res)=> res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html')));
}



app.listen(PORT,() => {
    connect();
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold);
});
