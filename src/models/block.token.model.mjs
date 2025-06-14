import mongoose from "mongoose";

const Schema = mongoose.Schema;

const blockTokenSchema = new Schema({
    token: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        enum: ["auth", "verify_email", "reset_password"],
        default: "auth",
    },
    expiresAt: {
        type: Date,
        required: true,
    },
});

export const BlockTokens = mongoose.model("BlockToken", blockTokenSchema);
