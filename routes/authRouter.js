import { Router } from "express";
import { protect } from "../middlewares/authMiddlewares.js";
import {
  getCurrent,
  login,
  logout,
  register,
  updateAvatarController,
  updateUserSubscription,
} from "../controllers/authController.js";
import validateBody from "../helpers/validateBody.js";
import { loginUserSchema, registerUserSchema } from "../schemas/userSchema.js";
import { uploadAvatar } from "../middlewares/userMiddlewares.js";

const router = Router();

// checkRegisterData signup
router.post('/register', validateBody(registerUserSchema), register);

//  checkLoginData, login
router.post('/login', validateBody(loginUserSchema), login);

// Loguot request
router.post('/logout', protect, logout)

// Current userSelect: 
router.get('/current', protect, getCurrent)

// Upload image
router.patch('/avatars', protect, uploadAvatar, updateAvatarController)

// Update subscription
router.patch("/", protect, updateUserSubscription)

export { router }
