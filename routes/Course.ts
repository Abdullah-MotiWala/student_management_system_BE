import { NextFunction, Request, Response, Router } from "express";
import { COURSE } from "../utils/apiRoutes";
import { createCourse, deleteCourse, editCourse, getAllCourse, getCourse } from "../controllers/Course";
import { validateUserLoggedIn } from "../middlewares/userLoggedIn";
import { validateAdminUser } from "../middlewares/adminLoggedIn";
import { validateSchema } from "../middlewares/schemaValidator";
import { courseAddEditValidations } from "../validations/course";

const router = Router()

const { CREATE, DELETE, EDIT, GET_ALL, GET } = COURSE

router.post(CREATE, validateUserLoggedIn, validateAdminUser, (req: Request, res: Response, next: NextFunction) => validateSchema(req, res, next, courseAddEditValidations), createCourse)
router.delete(`${DELETE}:id`, validateUserLoggedIn, validateAdminUser, deleteCourse)
router.put(`${EDIT}:id`, validateUserLoggedIn, validateAdminUser, (req: Request, res: Response, next: NextFunction) => validateSchema(req, res, next, courseAddEditValidations), editCourse)
router.get(GET_ALL, validateUserLoggedIn, validateAdminUser, getAllCourse)
router.get(`${GET}:id`, validateUserLoggedIn, validateAdminUser, getCourse)


export default router