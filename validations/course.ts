import { number, object, string } from "yup";
import { COURSE_TYPES } from "../utils/constants";

export const courseAddEditValidations = object().shape({
    title: string().required("Course title is required").min(3, "Course title must contain atleast 3 characters"),
    type: string().required("Course type is required").oneOf(Object.keys(COURSE_TYPES),"Type must be 0 for Weekends, 1 for Weekdays"),
    duration: number().required("Duration is required").positive("Duration cannot be negative").typeError("Duration must be number")
})