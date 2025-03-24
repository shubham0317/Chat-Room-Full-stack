import { genrateToken } from "../lib/utils.js"
import User from "../models/user.model.js"
import bcrypt from "bcryptjs"
import cloudinary from "../lib/cloudinary.js"


export const signup =  async (req,res) =>{
    const {fullName,email,password} = req.body

    try{

        if(!fullName || !email || !password){
            return res.status(400).json({
                message:"All fields are required"
            })
        }
        if(password.length < 6 ){
            return res.status(400).json({
                message:"Password Must be at least 6 characters"
            })
        }

        const user = await User.findOne({email})

        if(user){
            return res.status(400).json({
                message:"Email already exists"
            })
        };

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt)

        const newUser = new User ({
            fullName,
            email,
            password:hashedPassword
        })

        if(newUser){
          genrateToken(newUser._id,res)
          await newUser.save();
          
          res.status(201).json({
            _id:newUser._id,
            fullname: newUser.fullName,
            email: newUser.email,
            profilePic: newUser.profilePic,
          })
        } else {
            res.status(400).json({
                message:"Invalid user data"
            })
        }

    } catch (error) {
       console.log("Error in signup controller",error.message);
       res.status(500).json({ message: "Internal Server Error"})
    }
}
export const login = async (req,res) =>{
    
    const {email , password} = req.body
    try{
       const user = await User.findOne({email}) 

       if(!user) {
        return res.status(400).json({message: "Invalid Credentials"})
       }
      
       const isPasswordCorrect = await bcrypt.compare(password, user.password);
       if(!isPasswordCorrect){
        return res.status(400).json({message: "Invalid Credentials"})
       }

       genrateToken(user._id,res)

       res.status(200).json({
        _id: user._id,
        fullname: user.fullName,
        email: user.email,
        profilePic: user.profilePic,
       })

    } catch(error){
        console.log("Error in login controller", error.message)
        return res.status(500).json({message: "Internal Server Error"})
    }
}
export const logout = (req,res) =>{
    try{
        res.cookie("jwt","",  {maxAge:0} )
        return res.status(200).json({message:"Logged Out Successfully"})
    }catch(error){
        console.log("Error in logout controller", error.message)
        return res.status(500).json({message: "Internal Server Error"})
    }
}
export const updateprofile = async (req,res)=>{

    try{
        const {profilePic} = req.body;
       const userId =  req.user._id;

       if(!profilePic){
        return res.status(400).json({message: "profile pic is required"})
       }

      const uploadResponse =  await cloudinary.uploader.upload(profilePic)
      const updatedUser = await User.findByIdAndUpdate(userId, {profilePic: uploadResponse.secure_url}, {new:true})

      res.status(200).json(updatedUser)

    } catch(error){
      console.log("error in update profile: ",error);
      res.status(500).json({message: "Internal server error" })
    }
}

export const checkAuth = async (req,res) =>{
    try {
        if (!req.user) {
            return res.status(401).json({ message: "Unauthorized - No user data found" });
        }

        res.status(200).json(req.user);
    } catch (error) {
        console.error("Error in checkAuth controller:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}