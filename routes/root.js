import express from "express";
import { cwd as nodePath } from "node:process";
import { sep } from "node:path";
import { webAuth } from "../handlers/auth/auth.js";

const { Router } = express;
const router = Router();

router.get("/", webAuth, async (req, res) => {
  res.status(200).sendFile(`${nodePath()}${sep}html${sep}index.html`);
});

export { router as routerRoot };
