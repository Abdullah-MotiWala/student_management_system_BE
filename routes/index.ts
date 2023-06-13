import { Router } from "express";
import UserRouter from "./User"
import CourseRouter from "./Course"

const router = Router()

router.use("/course", CourseRouter)
router.use("/", UserRouter)

export default router