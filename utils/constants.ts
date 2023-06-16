export const EMAIL_REGEX = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/

export enum PAYMENT_STATUSES { Pending, Paid, Returned }
export enum USER_TYPES { Admin, Instructor, Student, SuperAdmin }
export enum COURSE_TYPES { Weekends, Weekdays }