import express from 'express';
import { randomNums } from '../handlers/routes/random.js';

const { Router } = express;
const router = Router();

router.get('/', randomNums);

export { router as routerRandom };
