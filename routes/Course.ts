import { NextFunction, Request, Response, Router } from "express";
import { COURSE } from "../utils/apiRoutes";
import { createCourse, deleteCourse, editCourse } from "../controllers/Course";
import { validateUserLoggedIn } from "../middlewares/userLoggedIn";
import { validateAdminUser } from "../middlewares/adminLoggedIn";
import { validateSchema } from "../middlewares/schemaValidator";
import { courseAddEditValidations } from "../validations/course";

const router = Router()

const { CREATE, DELETE, EDIT } = COURSE

router.post(CREATE, validateUserLoggedIn, validateAdminUser, (req: Request, res: Response, next: NextFunction) => validateSchema(req, res, next, courseAddEditValidations), createCourse)
router.delete(`${DELETE}:id`, validateUserLoggedIn, validateAdminUser, deleteCourse)
router.put(`${EDIT}:id`, validateUserLoggedIn, validateAdminUser, (req: Request, res: Response, next: NextFunction) => validateSchema(req, res, next, courseAddEditValidations), editCourse)
export default router