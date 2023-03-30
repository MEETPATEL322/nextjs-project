import { Schema, models, model } from "mongoose";

const UserSchema = new Schema({
    type: {
        type: String,
        required: true,
        default: "User"

    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
}, { timestamps: true });
const UserModel =
    models.User || model("User", UserSchema);
export default UserModel;
