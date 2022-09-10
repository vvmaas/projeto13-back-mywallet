import { Router } from "express"
import { logIn , signUp } from "../controllers/auth.controller.js"
import checkRegistration from "../middlewares/checkRegistration.middleware.js"
import checkAvailability from "../middlewares/checkAvailability.middleware.js"

const authRouter = Router()
authRouter.post("/login", checkRegistration, logIn)
authRouter.post("/signup", checkAvailability, signUp)
export default authRouter;