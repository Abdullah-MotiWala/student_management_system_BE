import { Request, Response } from "express"
import Course from "../models/Course"
import { badRequest, notFound, serverError, successRequest } from "../utils/responses"

export const createCourse = async (req: Request, res: Response) => {
    try {

        const { type, title, duration } = req.body

        const courseData = {
            type, title, duration,
        }

        const course = new Course(courseData)
        await course.save()

        return successRequest(res, 201, "Course added successfully")

    } catch (err: { _message: string } | any) {
        console.log("error : ", err);
        return serverError(res, err?._message)
    }
}

export const deleteCourse = async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        let course = await Course.findById(id)
        if (!course)
            return notFound(res, "Course not found")

        if (course.is_deleted)
            return badRequest(res, "Delted course cannot delete again")

        course.is_deleted = true
        course.deleted_by = req.body.userData.user.id
        course.deleted_at = new Date()

        await course.save()

        return successRequest(res, 200, "Course deleted successfully")
    } catch (err: { _message: string } | any) {
        console.log("error : ", err);
        return serverError(res, err?._message)
    }
}

export const editCourse = async (req: Request, res: Response) => {
    try {

        const { type, title, duration } = req.body
        const { id } = req.params

        const course = await Course.findById(id)

        if (!course)
            return notFound(res, "Course not found")
        if (course.is_deleted)
            return badRequest(res, "Course is deleted")

        if (title !== course.title)
            course.title = title

        course.type = type
        course.duration = duration
        course.updated_at = new Date()
        course.updated_by = req.body.userData.user.id

        const updatedCourse = await course.save()

        return successRequest(res, 201, "Course Updated successfully", updatedCourse)

    } catch (err: { _message: string } | any) {
        console.log("error : ", err);
        return serverError(res, err?._message)
    }
}
