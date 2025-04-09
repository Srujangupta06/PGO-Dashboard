import express from 'express';
import { userLogin, userLogoout, userRegistration } from '../controllers/authController.js';

const authRouter = express.Router();


authRouter.post('/register',userRegistration)

authRouter.post('/login',userLogin)

authRouter.post('/logout',userLogoout);

export default authRouter;