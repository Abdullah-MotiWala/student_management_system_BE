import { Router } from "express";
import UserRouter from "./User"
import CourseRouter from "./Course"
import StudentRouter from "./Student"

const router = Router()

router.use("/course", CourseRouter)
router.use("/student", StudentRouter)
router.use("/", UserRouter)

export default router