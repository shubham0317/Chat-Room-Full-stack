import User from "../models/user.model.js";
import Message from "../models/message.model.js";
import cloudinary from "../lib/cloudinary.js";
import { getRecieverSocketId } from "../lib/socket.js";
import { io } from "../lib/socket.js";

export const sendMessage = async (req, res) => {
    try {
        const { text, image } = req.body;
        const { id: receiverId } = req.params;
        const senderId = req.user._id;

        let imageUrl;

        if (image) {
            // Calculate size from base64 string (approximate, after removing data URI prefix)
            const base64Data = image.split(',')[1] || image; // Handle cases with or without "data:image/..." prefix
            const imageSizeMB = Buffer.byteLength(base64Data, 'base64') / (1024 * 1024);
            const maxSizeMB = 10; // Free plan limit

            if (imageSizeMB > maxSizeMB) {
                return res.status(400).json({ error: `Image size exceeds ${maxSizeMB}MB limit. Please upload a smaller image.` });
            }

            const uploadResponse = await cloudinary.uploader.upload(image);
            imageUrl = uploadResponse.secure_url;
        }

        const newMessage = new Message({
            senderId,
            receiverId,
            text,
            image: imageUrl,
        });

        await newMessage.save();

        const receiverSocketId = getRecieverSocketId(receiverId);
        if (receiverSocketId) {
            io.to(receiverSocketId).emit("newMessage", newMessage);
        }

        res.status(201).json(newMessage);
    } catch (error) {
        console.log("Error in sendMessages controller: ", error.message);
        res.status(500).json({ error: "Internal Server error" });
    }
};

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

