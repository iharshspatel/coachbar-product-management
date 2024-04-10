import express from 'express';
import {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  getAllUsers,
  updateUserProfile,
} from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js';
import { isAdmin } from '../middleware/authorizeMiddleware.js';

const router = express.Router();

router.post('/',protect, isAdmin, registerUser);
router.post('/auth', authUser);
router.post('/logout', logoutUser);
router.get('/all', protect, isAdmin, getAllUsers)
router
  .route('/profile')
  .get(protect, getUserProfile)
  .put(protect ,updateUserProfile);

export default router;
