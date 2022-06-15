import express from "express";
import { closeSession } from "../handlers/routes/logout.js";

const { Router } = express;
const router = new Router();

router.get("/", closeSession);

export { router as routerLogout };
