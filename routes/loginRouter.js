import { Router } from "express"

import { postSignUp, postSignIn } from "../controllers/loginController.js"

const loginRouter = Router()

loginRouter.post("/sign-up", postSignUp)
loginRouter.post('/sign-in', postSignIn)

export default loginRouter
