const mongoose = require("mongoose");

const shoppingBagSchema = new mongoose.Schema({
    userid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true
    },
    products: [
        {
            productid: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "product",
                required: true
            },
            unit: {
                unitid: {
                    type: mongoose.SchemaTypes.ObjectId,
                    ref: "product",
                    required: true
                },
                color: {
                    type: String,
                    required: true
                },
                size: {
                    type: String,
                    required: true
                },
                quantityInBag: {
                    type: Number,
                    required: true
                }
            }
        }
    ],
})

const ShoppingBag = mongoose.model("shoppingBag", shoppingBagSchema);

module.exports = ShoppingBag;