import express from 'express';
import { validateEmail } from '../middlewares/validateEmail';
import { forgotPassword, validateCode } from '../controllers/authController';

const router = express.Router();

router.post('/forgot-password', validateEmail, forgotPassword);
router.post('/validate-code', validateCode); // Nova rota

export default router;