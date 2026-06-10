import {Schema, model} from "mongoose"

const usersModel = new Schema({
    name: {type: String},
    email: {type: String},
    password: {type: String},
    created_at: {type: Date}
}, {
    timestamps: true,
    strict: false
})

export default model("users", usersModel)