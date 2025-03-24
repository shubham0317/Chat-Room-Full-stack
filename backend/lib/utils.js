import jwt from "jsonwebtoken"


export const genrateToken =  (userId,res) =>{

       //CREATING token
    
    const token = jwt.sign({userId}, process.env.JWT_TOKEN,{
        expiresIn:"7d"
    })
   
    res.cookie("jwt",token,{
        maxAge: 7 * 24 * 60 * 60 * 1000, //mili seconds
        httpOnly:true,  // prevent xss attacks cross-site scripting attacks
        sameSite:"strict",  //CSRF attakcks cross site request forgery attacks
        secure: process.env.NODE_ENV !== "development"
    });

    return token;

}