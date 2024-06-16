import { Request, Response } from "express";

import { serverError, success } from "../../services/response";
import { sign } from "../../services/jwt";

import { Auth } from "./model";


export const login = ({ user }: Request, res: Response) => {
    if (!user?.id) {
        return serverError(res);
    }
    return sign(user?.id)
        .then((token: string) => ({ token, user: user } as Auth))
        .then(success(res, 201))
        .catch(serverError(res));
}
