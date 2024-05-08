import { Router } from "express";
import { contacts, home } from "../controllers/viewController.js";

const router = Router();

router.get("/home", home);
router.get("/contacts", contacts);

export { router }
