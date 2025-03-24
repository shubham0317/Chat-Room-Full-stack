import mongoose from "mongoose"

//connect with db
export const connectDB = async () =>{
    try{
       const conn =  await mongoose.connect(process.env.MONGODB_URI);
       console.log(`MongoDB conncted : ${conn.connection.host}`)
    } catch (error){
      console.log("MongoDB connection error",error)
    }
}