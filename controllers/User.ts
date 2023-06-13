import { Request, Response } from "express"
import User from "../models/User"
import { serverError, successRequest, unAuthorized } from "../utils/responses"
import { generateToken } from "../helpers/token"
import { LoginToken } from "../interfaces/user"

export const signIn = async (req: Request, res: Response) => {
    try {

        const { email, password } = req.body

        let user = await User.findOne({ email })
        if (!user)
            return unAuthorized(res)

        let password_matched = password === user.password
        if (!password_matched)
            return unAuthorized(res)

        const userData = { email, id: user.id, name: user.name, user_type: user.user_type }
        const generatedToken = generateToken<LoginToken>(userData)

        return successRequest(res, 200, "User logged in successfully", { token: generatedToken })

    } catch (err: { _message: string } | any) {
        console.log("error : ", err);
        return serverError(res, err?._message)
    }
}