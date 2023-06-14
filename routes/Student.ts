import { Router } from "express";
import { STUDENT } from "../utils/apiRoutes";
import { validateAdminUser } from "../middlewares/adminLoggedIn";
import { validateUserLoggedIn } from "../middlewares/userLoggedIn";
import { addStudents } from "../controllers/Student";
import { excelToJson, parseFile } from "../middlewares/FileHanlder";

const router = Router()
const { ADD_STUDENTS } = STUDENT

router.post(ADD_STUDENTS, parseFile, validateUserLoggedIn, validateAdminUser, excelToJson, addStudents)

export default router 