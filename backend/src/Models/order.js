import { Schema, model } from "mongoose"

const orderModel = new Schema({
    session_id: { type: String, required: true, index: true },
    user_id: { type: Schema.Types.ObjectId, ref: "users", default: null },
    items: [{
        product_id: { type: Schema.Types.ObjectId, ref: "products", required: true },
        name: { type: String, required: true },
        price: { type: Number, required: true },
        quantity: { type: Number, required: true },
    }],
    total: { type: Number, required: true },
    status: { type: String, enum: ["pending", "paid", "failed"], default: "pending" },
    wompi: {
        idEnlace: { type: Number, default: null },
        urlEnlace: { type: String, default: null },
        idTransaccion: { type: String, default: null },
    },
}, {
    timestamps: true,
    strict: false
})

export default model("orders", orderModel)
