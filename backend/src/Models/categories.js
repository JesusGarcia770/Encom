import {Schema, model} from "mongoose"

const categoriesModel = new Schema({
    name: {type: String},
    created_at: {type: Date}
}, {
    timestamps: true,
    strict: false
})

export default model("categories", categoriesModel)