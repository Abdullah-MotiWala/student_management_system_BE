import { Request, Response } from "express";
import { badRequest, notFound, serverError, successRequest } from "../utils/responses";
import User from "../models/User";
import { getRandomPassword } from "../utils/generatePassword";
import Course from "../models/Course";
import { FilterQuery } from "mongoose";

export const addStudents = async (req: Request, res: Response) => {
    try {
        const studentData = req.body.sheetData
        const allQueryPromises: any[] = []
        const coursesOfStudents: { [key: string]: number[] } = {}

        studentData.forEach((studentRow: any) => {
            if (studentRow.includes("") || studentRow.includes(null) || !studentRow.length)
                return;

            const randomPassword = getRandomPassword()
            const student = {
                name: studentRow[0],
                email: studentRow[1],
                phone_number: studentRow[2],
                cnic: studentRow[3],
                father_name: studentRow[4],
                roll_no: studentRow[5],
                father_cnic: studentRow[6],
                qualification: studentRow[7],
                city: studentRow[8],
                course_name: studentRow[9],
                created_by: req.body.userData.user.id,
                password: randomPassword,
                user_type: 2
            }

            const newStudent = new User(student)
            allQueryPromises.push(newStudent.save())
        });


        const allNewStudents = await Promise.all(allQueryPromises)
        allNewStudents.map((student) => {
            coursesOfStudents[student.course_name] = [...(coursesOfStudents[student.course_name] || []), student.id]
        })

        const updatedCourses = await Promise.all(Object.keys(coursesOfStudents).map((course_name) => {
            return Course.findOneAndUpdate(
                { title: course_name },
                { $push: { students: { $each: coursesOfStudents[course_name] } } },
                { new: true }
            )
        }))


        // const sentEmail = await sendEmail({ from: "company", to: "aj@mailintor.com", subject: "Test", text: "test" })

        successRequest(res, 201, "Students added successfully")

    } catch (err: { _message: string } | any) {
        console.log("error : ", err);
        return serverError(res, err?._message)
    }
}

export const editStudent = async (req: Request, res: Response) => {
    try {

        const { name, father_name, cnic, father_cnic, city } = req.body
        const { id } = req.params


        const updatedStudent = await User.findOneAndUpdate(
            { _id: id, is_deleted: false, status: true },
            {
                name,
                father_name,
                cnic,
                father_cnic,
                city,
                updated_at: new Date(),
                updated_by: req.body.userData.user.id,
            },
            { new: true }
        ).select("-password -is_deleted");

        if (!updatedStudent) {
            return notFound(res, 'Student not found');
        }

        return successRequest(res, 200, "Student Updated successfully", updatedStudent)

    } catch (err: { _message: string } | any) {
        console.log("error : ", err);
        return serverError(res, err?._message)
    }
}

export const deleteStudent = async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        let student = await User.findById(id)
        if (!student)
            return notFound(res, "Student not found")

        if (student.is_deleted)
            return badRequest(res, "Delted student cannot delete again")

        student.is_deleted = true
        student.deleted_by = req.body.userData.user.id
        student.deleted_at = new Date()
        const thisStudentCourse = await Course.updateOne({ title: student.course_name }, { $pull: { students: student.id } })


        await student.save()

        return successRequest(res, 200, "Student deleted successfully")
    } catch (err: { _message: string } | any) {
        console.log("error : ", err);
        return serverError(res, err?._message)
    }
}

export const updateStudentStatus = async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        const { status } = req.body
        let student = await User.findById(id)
        if (!student)
            return notFound(res, "Student not found")

        if (student.is_deleted)
            return badRequest(res, "Deleted student cannot update")

        if (student.status == status)
            return badRequest(res, "Status must be changed")

        student.status = status
        student.updated_by = req.body.userData.user.id
        student.updated_at = new Date()

        await student.save()

        return successRequest(res, 200, "Status Updated successfully")
    } catch (err: { _message: string } | any) {
        console.log("error : ", err);
        return serverError(res, err?._message)
    }
}

export const updatePaymentStatus = async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        const { status } = req.body

        let student = await User.findById(id)
        if (!student)
            return notFound(res, "Student not found")

        if (student.is_deleted)
            return badRequest(res, "Deleted student cannot update")

        if (!student.status)
            return badRequest(res, "Student is inActive")

        if (student.payment_status == status)
            return badRequest(res, "Payment status must be changed")


        student.payment_status = status
        student.updated_by = req.body.userData.user.id
        student.updated_at = new Date()

        await student.save()

        return successRequest(res, 200, "Payment status Updated successfully")

    } catch (err: { _message: string } | any) {
        console.log("error : ", err);
        return serverError(res, err?._message)
    }
}

export const getAllStudents = async (req: Request, res: Response) => {
    try {
        const limit = Number(req.query.limit)
        const page = Number(req.query.page)
        const { course_name = "", payment_status = "", roll_no = "" } = req.query

        const matchQuery: FilterQuery<{ is_deleted: boolean, user_type: Number, $or: any }> = {
            is_deleted: false,
            user_type: 2,
        }

        if (course_name || payment_status || roll_no) {
            matchQuery.$or = [];

            if (course_name) {
                matchQuery.$or.push({ course_name });
            }

            if (payment_status) {
                matchQuery.$or.push({ payment_status: Number(payment_status) });
            }

            if (roll_no) {
                matchQuery.$or.push({ roll_no });
            }
        }

        const [students] = await User.aggregate([{
            $facet: {
                data: [
                    { $match: matchQuery },
                    { $limit: limit },
                    { $skip: limit * (page - 1) },
                    {
                        $project: {
                            password: 0,
                            is_deleted: 0
                        }
                    }
                ],

                count: [
                    { $match: matchQuery },
                    { $count: "total" }
                ]
            }
        }])
        const data = { limit, page, totalCount: students.count[0]?.total || 0, courses: students.data }

        return successRequest(res, 200, null, data)

    } catch (err: { _message: string } | any) {
        console.log("error : ", err);
        return serverError(res, err?._message)
    }
}

export const getStudent = async (req: Request, res: Response) => {
    try {
        const { id } = req.query
        const student = await User.findOne({ _id: id, is_deleted: false, user_type: 2 }).select("-password -is_deleted")
        if (!student)
            return notFound(res, "Student not found")

        return successRequest(res, 200, "", student)

    } catch (err: { _message: string } | any) {
        console.log("error : ", err);
        return serverError(res, err?._message)
    }
}
