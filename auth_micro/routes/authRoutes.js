import { Router } from "express";
import AuthController from "../controller/AuthController.js";
import authMiddleware from "../middleware/authMiddleware.js";
const router = Router();

router.post("/auth/register", AuthController.register)
router.post("/auth/login", AuthController.login)

//private route - can't access it without token
router.get("/auth/user", authMiddleware, AuthController.user)



export default router;