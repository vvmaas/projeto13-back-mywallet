import { Router } from "express"
import {getRegisterList, postRegister} from "../controllers/register.controller.js"
import checkToken from "../middlewares/checkToken.middleware.js"
import checkSession from "../middlewares/checkSession.middleware.js"
import checkUser from "../middlewares/checkUser.middleware.js"

const registerRouter = Router()
registerRouter.get("/register", checkToken, checkSession, checkUser, getRegisterList)
registerRouter.post("/register", checkToken, checkSession, checkUser, postRegister)
export default registerRouter;