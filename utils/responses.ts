import { Response } from "express";

export const badRequest = (res: Response, message: string = "Bad Request Found") => {
    res.send({ message, success: false, }).status(400)
}

export const serverError = (res: Response, message: string = "Internal Server Error") => {
    res.send({ message, success: false }).status(500)
}

export const unAuthorized = (res: Response, message: string = "Credentials not found") => {
    res.send({ message, success: false }).status(401)
}

export const successRequest = (res: Response, status: number, message: string | null, data?: any) => {
    res.send({ success: true, ...(data && { data }), ...(message && { message }) }).status(status)
}

export const notFound = (res: Response, message: string = "Not Found") => {
    res.send({ success: false, message }).status(404)
}