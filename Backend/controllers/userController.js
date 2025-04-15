import User from "../models/userModel.js";
import asyncHandler from "../middlewares/asyncHandler.js";
import bcrypt from "bcryptjs";
import createToken from "../utils/createToken.js";


const createUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        res.status(400);
        throw new Error("Please fill all the fields");
    }
    const userExists = await User.findOne({ email });
    if (userExists) {
        res.status(400);
        throw new Error("User already exists");
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
        name,
        email,
        password: hashedPassword,
    });
    try{
        await newUser.save();
        const token = createToken(res,newUser._id);
        res.status(201).json({_id: newUser._id, name: newUser.name, email: newUser.email, isAdmin: newUser.isAdmin});
    } catch(error){
        res.status(400);
        throw new Error("Invalid user data");
    }
    


});

const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(400);
        throw new Error("Please fill all the fields");
    }
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
        res.status(400);
        throw new Error("Invalid credentials");
    }
    const isMatch = await bcrypt.compare(password, existingUser.password);
    if (!isMatch) {
        res.status(400);
        throw new Error("Invalid credentials");
    }
    const token = createToken(res,existingUser._id);
    res.status(200).json({_id: existingUser._id, name: existingUser.name, email: existingUser.email, isAdmin: existingUser.isAdmin});


});

const logoutUser = asyncHandler(async (req, res) => {
    res.cookie("jwt",'',{
        httpOnly: true,
        expires: new Date(0),
    })
    res.status(200).json({ message: "Logged out successfully" });
});

const getAllUsers = asyncHandler(async (req, res) => {
    const allUsers = await User.find({});
    res.status(200).json(allUsers);
});

const getCurrentUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);
    console.log(user);
    if (!user) {
        res.status(404);
        throw new Error("User not found");
    }
    res.status(200).json({_id: user._id, name: user.name, email: user.email, isAdmin: user.isAdmin});

});

const updateUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);
    if(user){
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        if(req.body.password){
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(req.body.password, salt);
        }
        const updatedUser = await user.save();
        res.status(200).json({_id: updatedUser._id, name: updatedUser.name, email: updatedUser.email, isAdmin: updatedUser.isAdmin});
    }
    else{
        res.status(404);
        throw new Error("User not found");
    }

});
const deleteUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    console.log(user)
    if (!user) {
        res.status(404);
        throw new Error("User not found");
    }
    if (user.isAdmin) {
        res.status(400);
        throw new Error("Cannot delete admin user");
    }
    await User.deleteOne({ _id: user._id });
    res.status(200).json({ message: "User deleted successfully" });
});

const getUserById = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id).select("-password");
    if (!user) {
        res.status(404);
        throw new Error("User not found");
    }
    res.status(200).json(user);
});

const updateUserById = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    if (!user) {
        res.status(404);
        throw new Error("User not found");
    
    }
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.isAdmin = req.body.isAdmin || user.isAdmin;
    const updatedUser = await user.save();
    res.status(200).json({ _id: updatedUser._id, name: updatedUser.name, email: updatedUser.email, isAdmin: updatedUser.isAdmin });
});
export { createUser, loginUser, logoutUser, getAllUsers, getCurrentUser, updateUserProfile,deleteUser, getUserById, updateUserById };