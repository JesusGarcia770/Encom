import {Schema, model} from "mongoose"

const categoriesModel = new Schema({
    name: {type: String},
    description: {type: String},
    status: {type: String, enum: ['Activo', 'Inactivo'], default: 'Activo'}
}, {
    timestamps: true,
    strict: false
})

export default model("categories", categoriesModel)