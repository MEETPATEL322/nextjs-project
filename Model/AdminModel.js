import { Schema, models, model } from "mongoose";

const AdminSchema = new Schema({
  type: {
    type: String,
    required: true,
    default: "Admin"

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
const AdminModel =
  models.Admin || model("Admin", AdminSchema);
export default AdminModel;
