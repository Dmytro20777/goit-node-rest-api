import { Router } from "express";
import { checkLoginData, checkRegisterData, protect } from "../middlewares/authMiddlewares.js";
import { getCurrent, login, logout, register, updateUserSubscription } from "../controllers/authController.js";

const router = Router();

// checkRegisterData signup
router.post('/register', checkRegisterData, register);

//  checkLoginData, login
router.post('/login', checkLoginData, login);

// Loguot request
router.post('/logout', protect, logout)

// Current userSelect: 
router.get('/current', protect, getCurrent)

// Update subscription
router.patch("/", protect, updateUserSubscription)

export { router }
