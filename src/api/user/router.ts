import { Router } from "express";
import { create } from "./controller";
// import { token } from "../../services/passport";


const router = Router();

router.post("/", create);

// router.put("/", token({ required: true }), update);

// router.delete("/", token({ required: true, roles: ['admin'] }), remove);

// router.get("/", token({ required: true, roles: ['admin'] }), getAll);

// router.get("/:id", token({ required: true, roles: ['admin'] }), getById);

// router.get("/me", token({ required: true }), getMe);

export default router;
