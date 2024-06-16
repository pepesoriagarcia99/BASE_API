import { Router, Response, Request } from "express";

import auth from "./auth/controller";
import user from "./user/router";


const router = Router();

router.get('/ping', (req: Request, res: Response) => res.send('pong').end());
router.use("/", auth);
router.use("/user", user);

export default router;