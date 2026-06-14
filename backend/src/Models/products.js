import { Schema, model } from "mongoose";

const prouductsModel = new Schema({
    name: {type: String},
    description: {type: String},
    category_id: {type: Schema.Types.ObjectId, ref: "categories"},
    price: {type: Number},
    stock: {type: Number},
    image: {type: String},
    public_id: {type: String},
}, {
    timestamps: true,
    strict: false
})

export default model("products", prouductsModel)