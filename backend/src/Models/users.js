import {Schema, model} from "mongoose"

const usersModel = new Schema({
    name: {type: String, required: true, trim: true},
    email: {type: String, required: true, trim: true, lowercase: true, unique: true},
    password: {type: String, required: true, select: false},
    phone: {type: String, trim: true},
    role: {type: String, enum: ["admin", "cliente"], default: "cliente"},
    resetPasswordToken: {type: String, select: false},
    resetPasswordExpires: {type: Date, select: false}
}, {
    timestamps: true
})

export default model("users", usersModel)
