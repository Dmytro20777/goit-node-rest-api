import { Router } from "express";
import { protect } from "../middlewares/authMiddlewares.js";
import { getCurrent, login, logout, register, updateUserSubscription } from "../controllers/authController.js";
import validateBody from "../helpers/validateBody.js";
import { loginUserSchema, registerUserSchema } from "../schemas/userSchema.js";

const router = Router();

// checkRegisterData signup
router.post('/register', validateBody(registerUserSchema), register);

//  checkLoginData, login
router.post('/login', validateBody(loginUserSchema), login);

// Loguot request
router.post('/logout', protect, logout)

// Current userSelect: 
router.get('/current', protect, getCurrent)

// Update subscription
router.patch("/", protect, updateUserSubscription)

export { router }
