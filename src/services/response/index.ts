import { Response } from "express"

export const success = (res: Response, status: number) => (entity: any) => {
    if (entity) {
        res.status(status || 200).json(entity)
    }
    return null
}

export const notFound = (res: Response) => (entity: any) => {
    if (entity) {
        return entity
    }
    res.status(404).end()
    return null
}

export const serverError = (res: Response) => (err: any) => {
    res.status(500).json({
        date: new Date(),
        message: err.message,
        stack: err.stack,
    }).end()

    return null
}
