import { Schema } from "yup";
import { badRequest } from "../utils/responses";
import { NextFunction, Request, Response } from "express";

export const validateSchema = async (req: Request, res: Response, next: NextFunction, schema: Schema<any>) => {
    try {
        await schema.validate(req.body);
        next()
    } catch (err: any) {
        return badRequest(res, err.message)
    }
}