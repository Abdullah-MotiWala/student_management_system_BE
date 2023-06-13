import { Schema, model } from "mongoose";
import { PAYMENT_STATUSES, USER_TYPES } from "../utils/constants";

const UserSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone_number: { type: String, required: true, unique: true },
    cnic: { type: String, unique: true },
    password: { type: String, required: true },

    branch_name: { type: String },
    qualification: { type: String },
    father_name: { type: String },
    father_cnic: { type: String, unique: true },
    roll_no: { type: String, unique: true },
    payment_status: { type: Number, enum: PAYMENT_STATUSES, },
    status: { type: Boolean, default: true },

    is_deleted: { type: Boolean, default: false },
    deleted_by: { type: Schema.Types.ObjectId, ref: "user" },
    created_by: { type: Schema.Types.ObjectId, ref: "user" },
    updated_by: { type: Schema.Types.ObjectId, ref: "user" },

    deleted_at: { type: Date },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date },

    user_type: { type: Number, enum: USER_TYPES, required: true },
    is_super_admin: { type: Boolean, default: false }
})

UserSchema.index({ payment_status: 1 });
UserSchema.index({ user_type: 1 });
UserSchema.index({ status: 1 });
UserSchema.index({ email: 1 }, { unique: true });

const User = model("user", UserSchema)

export default User
