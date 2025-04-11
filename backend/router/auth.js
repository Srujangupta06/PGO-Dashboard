import express from 'express';
import { userLogin, userLogoout, userRegistration } from '../controllers/authController.js';
import {auth} from '../middlewares/auth.js';
const authRouter = express.Router();


authRouter.post('/register',userRegistration)

authRouter.post('/login',userLogin)

// authRouter.post('/logout',auth,userLogoout);

export default authRouter;