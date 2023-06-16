import { NextFunction, Request, Response, Router } from "express";
import { STUDENT } from "../utils/apiRoutes";
import { validateAdminUser } from "../middlewares/adminLoggedIn";
import { validateUserLoggedIn } from "../middlewares/userLoggedIn";
import { addStudents, deleteStudent, editStudent, getAllStudents, updatePaymentStatus, updateStudentStatus } from "../controllers/Student";
import { excelToJson, parseFile } from "../middlewares/FileHanlder";
import { validateSchema } from "../middlewares/schemaValidator";
import { editStudentValidations, updatePaymentStatusValidations } from "../validations/student";
import { updateStatusValidations } from "../validations/user";

const router = Router()
const { ADD_STUDENTS, EDIT, DELETE, UPDATE_STATUS, UPDATE_PAYMENT_STATUS, GET_ALL } = STUDENT

router.post(ADD_STUDENTS, parseFile, validateUserLoggedIn, validateAdminUser, excelToJson, addStudents)
router.put(`${EDIT}:id`, validateUserLoggedIn, validateAdminUser, (req: Request, res: Response, next: NextFunction) => validateSchema(req, res, next, editStudentValidations), editStudent)
router.put(`${UPDATE_STATUS}:id`, validateUserLoggedIn, validateAdminUser, (req: Request, res: Response, next: NextFunction) => validateSchema(req, res, next, updateStatusValidations), updateStudentStatus)
router.put(`${UPDATE_PAYMENT_STATUS}:id`, validateUserLoggedIn, validateAdminUser, (req: Request, res: Response, next: NextFunction) => validateSchema(req, res, next, updatePaymentStatusValidations), updatePaymentStatus)
router.delete(`${DELETE}:id`, validateUserLoggedIn, validateAdminUser, deleteStudent)
router.get(GET_ALL, validateUserLoggedIn, validateAdminUser, getAllStudents)

export default router 