import { Request, Response } from "express";
import crypto from "crypto";

export const getRandomPassword = () => {
    const length: number = 8
    const generatedPassword: string = crypto.randomBytes(length).toString('hex')

    return generatedPassword
}
