import express from 'express';
import { sendLogin, initSession } from '../handlers/routes/login.js';

const { Router } = express;
const router = new Router();

router.get('/', sendLogin);

router.post('/', initSession);

export { router as routerLogin };
