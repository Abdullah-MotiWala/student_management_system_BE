import { NextFunction, Request, Response, Router } from "express";
import { signIn } from "../controllers/User";
import { USER } from "../utils/apiRoutes";
import { validateSchema } from "../middlewares/schemaValidator";
import { signInValidations } from "../validations/user";

const router = Router()
const { SIGN_IN } = USER

router.post(SIGN_IN, (req: Request, res: Response, next: NextFunction) => validateSchema(req, res, next, signInValidations), signIn)

export default router 