import { Request, Response } from 'express';

import User from './model';
import { notFound, serverError, success } from '../../services/response';
import UserRepository from './repository'

export const userCreate = (data: any) => {
    const user: User = new User(
        undefined,
        data.name,
        data.password,
        data.role
    );

    user.preSave();

    return UserRepository.insert(user);
}


export const update = (req: Request, res: Response) => {
    /**
     * PUEDE EDITAR A SI MISMO Y A OTROS USUARIOS SI ES ADMIN
     */
}

export const remove = (req: Request, res: Response) => {
    // return UserRepository.remove(req.params.id)
    //     .then(notFound(res))
    //     .then(success(res, 204))
    //     .catch(serverError(res));
}

export const getAll = (req: Request, res: Response) => {

}

export const getById = (req: Request, res: Response) => {

}

export const getMe = (req: Request, res: Response) => {

}
