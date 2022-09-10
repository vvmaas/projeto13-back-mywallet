import { Router } from "express";
import authRouter from "./auth.router.js";
import registerRouter from "./register.router.js";

const router = Router()
router.use(authRouter)
router.use(registerRouter)
export default router