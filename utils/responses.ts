import { Response } from "express";

export const badRequest = (res: Response, message: string = "Bad Request Found") => {
    res.status(400).send({ message, success: false, })
}

export const serverError = (res: Response, message: string = "Internal Server Error") => {
    res.status(500).send({ message, success: false })
}

export const unAuthorized = (res: Response, message: string = "Credentials not found") => {
    res.status(401).send({ message, success: false })
}

export const successRequest = (res: Response, status: number, message: string | null, data?: any) => {
    res.status(status).send({ success: true, ...(data && { data }), ...(message && { message }) })
}

export const notFound = (res: Response, message: string = "Not Found") => {
    res.status(404).send({ success: false, message })
}