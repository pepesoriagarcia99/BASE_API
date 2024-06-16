import { Router } from "express";

import { master, password } from "../../services/passport";
import { login } from "./service";

const router = Router();

router.post("/login", master(), password(), login);

export default router;
