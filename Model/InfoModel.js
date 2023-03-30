import { Schema, models, model } from "mongoose";
const InfoSchema = new Schema(
  {
    firstname: {
      type: String,
      required: true,
    },
    lastname: { type: String, required: true },
    mobile: { type: Number, required: true },
    gender: { type: String, required: true, default: "Male" },
    email: { type: String, required: true },
    address: { type: String },
    birthdate: { type: Date, required: true },
    education: String,
    languages: { type: Array },
    image: {
      type: String,
    },
    salary: {
      minValue: {
        type: Number,
        // required: true
      },
      maxValue: {
        type: Number,
        // required: true
      }
    }
  },
  { timestamps: true }
);

const InfoModel =
  models.information || model("information", InfoSchema);
export default InfoModel;
