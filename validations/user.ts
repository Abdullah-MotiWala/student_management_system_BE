import { object, string } from "yup";
import { EMAIL_REGEX } from "../utils/constants";

export const signInValidations = object().shape({
    email: string().email("Invalid email address").matches(EMAIL_REGEX,"Invalid email address").required("Email is required"),
    password: string().required("Password is required")
})