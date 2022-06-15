import express from 'express';
import { getInfo } from '../handlers/routes/info.js';
import { webAuth } from '../handlers/auth/auth.js';

const { Router } = express;
const router = new Router();

router.get('/', getInfo);

export { router as routerInfo };
