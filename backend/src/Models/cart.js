import { Schema, model } from "mongoose";

const cartModel = new Schema({
    session_id: { type: String, required: true, unique: true, index: true },
    user_id: { type: Schema.Types.ObjectId, ref: "users", default: null },
    items: [{
        product_id: { type: Schema.Types.ObjectId, ref: "products", required: true },
        quantity: { type: Number, required: true, min: 1 },
    }],
}, {
    timestamps: true,
    strict: false
})

export default model("carts", cartModel)
