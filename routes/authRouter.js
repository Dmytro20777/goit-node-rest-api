import { Router } from "express";
import { protect } from "../middlewares/authMiddlewares.js";
import {
  forgotPasswordUser,
  getCurrent,
  login,
  logout,
  register,
  resendVerificationEmail,
  resetPassword,
  updateAvatarController,
  updateUserSubscription,
  verifyToken,
} from "../controllers/authController.js";
import validateBody from "../helpers/validateBody.js";
import { loginUserSchema, newPassword, registerUserSchema, verification } from "../schemas/userSchema.js";
import { uploadAvatar } from "../middlewares/userMiddlewares.js";

const router = Router();

// checkRegisterData signup
router.post('/register', validateBody(registerUserSchema), register);

//  checkLoginData, login
router.post('/login', validateBody(loginUserSchema), login);

// Password restoring
router.post('/forgot-password', validateBody(verification), forgotPasswordUser);

// Update user password
router.post("/restore-password/:otp", validateBody(newPassword), resetPassword); 

// Loguot request
router.post('/logout', protect, logout)

// Current userSelect: 
router.get('/current', protect, getCurrent)

// Upload image
router.patch('/avatars', protect, uploadAvatar, updateAvatarController)

// Update subscription
router.patch("/", protect, updateUserSubscription)

// Verify user
router.get("/verify/:verificationToken", verifyToken)

// Re-verification user
router.post("/verify", resendVerificationEmail)

export { router }
