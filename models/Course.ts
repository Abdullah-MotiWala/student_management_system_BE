import { Schema, model } from "mongoose";
import { COURSE_TYPES } from "../utils/constants";

const CourseSchema = new Schema({
    title: { type: String, required: true, unique: true },
    type: { type: Number, enum: COURSE_TYPES, required: true },
    duration: { type: Number, required: true },
    students: { type: Array, default: [] },
    instructors: { type: Array, default: [] },

    status: { type: Boolean, default: true },

    is_deleted: { type: Boolean, default: false },
    deleted_by: { type: Schema.Types.ObjectId, ref: "user" },
    created_by: { type: Schema.Types.ObjectId, ref: "user" },
    updated_by: { type: Schema.Types.ObjectId, ref: "user" },

    created_at: { type: Date, default: Date.now },
    deleted_at: { type: Date },
    updated_at: { type: Date },
})

CourseSchema.index({ title: 1 }, { unique: true });
CourseSchema.index({ type: 1 });
CourseSchema.index({ status: 1 });

const Course = model("course", CourseSchema)

export default Course