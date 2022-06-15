import express from 'express';
import { registerUser } from '../handlers/routes/register.js';

const { Router } = express;
const router = new Router();

router.post('/', registerUser);

export { router as routerRegister };
