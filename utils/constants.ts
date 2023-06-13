export const EMAIL_REGEX = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/
export const PAYMENT_STATUSES = { 0: 'Pending', 1: "Paid", 2: "Returned" }
export const USER_TYPES = { 0: "admin", 1: "instructor", 2: "student" }

export enum COURSE_TYPES { Weekends, Weekdays }