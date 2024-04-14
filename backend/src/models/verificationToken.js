const mongoose = require("mongoose");

const verificationTokenSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true
    },
    token: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        required: true
    }
});

const Token = mongoose.model("verificationToken", verificationTokenSchema);

module.exports = Token;
