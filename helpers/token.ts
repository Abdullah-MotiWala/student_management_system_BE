import * as jwt from "jsonwebtoken"

export const generateToken = <T>(userData: T) => {

    const data = {
        user: userData
    }

    const token = jwt.sign(data, process.env.JWT_SECRET || "")

    return token
}


export const dataFromToken = (token: string) => {
    const decodeData = jwt.verify(token, process.env.JWT_SECRET || "");
    return decodeData
}