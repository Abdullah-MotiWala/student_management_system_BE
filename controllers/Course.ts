import { Request, Response } from "express"
import Course from "../models/Course"
import { badRequest, notFound, serverError, successRequest } from "../utils/responses"

export const createCourse = async (req: Request, res: Response) => {
    try {

        const { type, title, duration } = req.body

        const courseData = {
            type, title, duration, created_by: req.body.userData.user.id
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

export const getAllCourse = async (req: Request, res: Response) => {
    try {
        const limit = Number(req.query.limit)
        const page = Number(req.query.page)

        const [courses] = await Course.aggregate([{
            $facet: {
                data: [
                    { $match: { is_deleted: false } },
                    { $limit: limit },
                    { $skip: limit * (page - 1) }
                ],
                count: [
                    { $match: { is_deleted: false } },
                    { $count: "total" }
                ]
            }
        }])
        const data = { limit, page, totalCount: courses.count[0].total, courses: courses.data }

        return successRequest(res, 200, null, data)

    } catch (err: { _message: string } | any) {
        console.log("error : ", err);
        return serverError(res, err?._message)
    }
}
