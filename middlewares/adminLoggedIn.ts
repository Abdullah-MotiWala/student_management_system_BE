import { NextFunction, Request, Response } from "express";
import { badRequest } from "../utils/responses";
import User from "../models/User";

export const validateAdminUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { userData: { user } } = req.body
        const isAdmin = user.user_type === 0


        if (!isAdmin)
            return badRequest(res, "Only admin can access")

        next()
    } catch (err: any) {
        return badRequest(res, err.message)
    }
}