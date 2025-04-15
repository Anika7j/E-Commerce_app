import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
import asyncHandler from "./asyncHandler.js";

const authenticateUser = asyncHandler(async (req, res, next) => {
    let token;


    token = req.cookies.jwt
    if(token){
        try{
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            const user = await User.findById(decoded.userID);

            if(!user){
               res.status(404).json({message: "User not found"})
               return
            }
            req.user = user;
            next();
        } catch (error){
            res.status(401);
            throw new Error("Not authorized, token failed");
        }
    } else {
        res.status(401);
        throw new Error("Not authorized, no token");
    }
});


const authorizeAdmin = (req, res, next) => {
    if (req.user && req.user.isAdmin) {
        next();
    } else {
        res.status(403).send("Not authorized as an admin");
    }
};

export  { authenticateUser, authorizeAdmin };