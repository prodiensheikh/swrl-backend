import { Router } from 'express';
import { getOtp, getSelf, verifyOtp } from '../controllers/auth';
import { verifyUser } from '../jwt';

const authRouter = Router();

authRouter.post('/otp', getOtp);
authRouter.post('/verify', verifyOtp);
authRouter.get('/self', verifyUser, getSelf);

export default authRouter;