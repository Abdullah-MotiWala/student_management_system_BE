import { number, object, string } from "yup";
import { PAYMENT_STATUSES } from "../utils/constants";

export const editStudentValidations = object().shape({
    name: string().required("Name is required").min(3, "Name must contain atleast 3 characters"),
    father_name: string().required("Father Name is required").min(3, "Father Name must contain atleast 3 characters"),
    cnic: number().required("CNIC is required").min(13, "CINC is invalid, must contain just digits"),
    father_cnic: number().required("Father CNIC is required").min(13, "Father CINC is invalid, must contain just digits"),
    city: string().required("City is required").min(3, "City must contain atleast 3 characters"),
})

export const updatePaymentStatusValidations = object().shape({
    status: string().required("Payment status is requried").oneOf(Object.keys(PAYMENT_STATUSES), "Payment status must be 1 for paid, 2 for returned ")
})