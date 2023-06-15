import { Request, Response } from "express";
import { serverError, successRequest } from "../utils/responses";
import User from "../models/User";
import { sendEmail } from "../utils/sendEmail";
import { getRandomPassword } from "../utils/generatePassword";
import Course from "../models/Course";

export const addStudents = async (req: Request, res: Response) => {
    try {
        const studentData = req.body.sheetData
        const allQueryPromises: any[] = []
        const allEmailPromises: any[] = []
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
                password: randomPassword
            }

            const newStudent = new User(student)
            // const sentEmail = sendEmail({})
            allQueryPromises.push(newStudent)
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

        successRequest(res, 201, "Students added successfully", updatedCourses)

    } catch (err: { _message: string } | any) {
        console.log("error : ", err);
        return serverError(res, err?._message)
    }
}