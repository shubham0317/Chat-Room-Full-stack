import User from "../models/user.model.js";
import Message from "../models/message.model.js"
import cloudinary from "../lib/cloudinary.js";
import { getRecieverSocketId } from "../lib/socket.js";
import { io } from "../lib/socket.js";

export const getUserForSideBar = async (req,res) =>{

    try{
        const loggedInUserId = await req.user._id;
        // find all the user except loggedInuser and fetch all details except password
        const filteredUser = await User.find({_id: {$ne:loggedInUserId}}).select("-password");
     
        res.status(200).json(filteredUser)
    }  catch (error){
        console.error("Error in getUserForSideBar: ",error.message);
        res.status(500).json({error: "Internal server error"})
    }
   
}

export const getMessages = async (req,res) =>{

    try{
    const {id: userToChatId} = req.params
    const myId = req.user._id;

    const messages = await Message.find({
        $or:[
           {senderId: myId, receiverId:userToChatId},
           {senderId:userToChatId, receiverId:myId}
        ]
    })
    res.status(200).json(messages)
    }catch(error){
       console.log("Error in getMessages controller: ",error.message);
       res.status(500).json({error: "Internal Server error"})
    }
}

export const sendMessage = async (req,res) =>{

    try{
        const {text,image} = req.body
        const {id: receiverId} = req.params
        const senderId = req.user._id;

        let imageUrl;

        if(image){
            const uploadResponse = await cloudinary.uploader.upload(image);
            imageUrl = uploadResponse.secure_url
        }

        const newMessage = new Message({
            senderId,
            receiverId,
            text,
            image: imageUrl,
        });

        await newMessage.save();

        const receiverSocketId = getRecieverSocketId(receiverId);

        if(receiverSocketId){
            io.to(receiverSocketId).emit("newMessage", newMessage)
        }

        //realtime functionality goes here => socket.io

        res.status(201).json(newMessage)
    } catch(error){
        console.log("Error in sendMessages controller: ",error.message);
        res.status(500).json({error: "Internal Server error"})
    }
}