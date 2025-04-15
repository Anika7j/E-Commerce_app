import express from 'express';
import { createUser,loginUser,logoutUser,getAllUsers,getCurrentUser,updateUserProfile,deleteUser,getUserById,updateUserById } from '../controllers/userController.js';
import {authenticateUser,authorizeAdmin} from '../middlewares/authMiddleware.js';

const router = express.Router();

router.route('/').post(createUser).get(authenticateUser,authorizeAdmin,getAllUsers);
router.post('/login',loginUser);
router.post('/logout',logoutUser);

router.route('/profile').get(authenticateUser,getCurrentUser).put(authenticateUser,updateUserProfile);


//admin routes
router.route('/:id').delete(authenticateUser,authorizeAdmin,deleteUser).get(authenticateUser,authorizeAdmin,getUserById).put(authenticateUser,authorizeAdmin,updateUserById);

export default router;