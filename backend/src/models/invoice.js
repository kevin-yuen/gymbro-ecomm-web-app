const mongoose = require("mongoose");

const invoiceSchema = new mongoose.Schema({
    invoiceid: {
        type: String,
        required: true,
    },
    order: {
        type: Object,
        required: true
    }
})

const Invoice = mongoose.model("invoice", invoiceSchema);

module.exports = Invoice;