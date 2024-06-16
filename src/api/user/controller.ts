// import { Router } from "express";
// // import { token } from "../../services/passport";

import { Request, Response } from "express";
import { notFound, serverError, success } from "../../services/response";
import User from "./model";
import { userCreate } from "./service";

// import { create, getAll, getById, getMe, remove, update } from "./service";

// const router = Router();

// router.post("/", ({ body }: Request, res: Response) => {
//     create(body)
//         .then(notFound(res))
//         .then(success(res, 200))
//         .catch(serverError(res));
// });

// router.put("/", token({ required: true }), update);

// router.delete("/", token({ required: true, roles: ['admin'] }), remove);

// router.get("/", token({ required: true, roles: ['admin'] }), getAll);

// router.get("/:id", token({ required: true, roles: ['admin'] }), getById);

// router.get("/me", token({ required: true }), getMe);

// export default router;

export const create = ({ body }: Request, res: Response) => {
    const user: User = new User(
        undefined,
        body.name,
        body.password,
        body.role
    );

    return userCreate(user)
        .then(notFound(res))
        .then(success(res, 200))
        .catch(serverError(res));
}

