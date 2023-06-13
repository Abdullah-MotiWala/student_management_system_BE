import { NextFunction, Request, Response } from "express";
import { dataFromToken } from "../helpers/token";
import { badRequest, unAuthorized } from "../utils/responses";

export const validateUserLoggedIn = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.header("token")
        if (!token)
            return unAuthorized(res, "token not found")

        const userData = dataFromToken(token)
        if (!userData)
            return unAuthorized(res, "token not found")

        req.body = { ...req.body, userData }

        next()
    } catch (err: any) {
        return badRequest(res, err.message)
    }
}