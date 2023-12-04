import { Int32 } from "mongodb";
import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    name: { type: String, required: [true] },
    password: { type: String, required: [true] },
    email: { 
      type: String,
      required: true,
      unique: true,
      match: [/^\S+@\S+\.\S+$/, 'Invalid email address'],
    },
    address: { type: String, required: [true] },
    phone: { type: Number, required: [true], unique: [true] },
    nameRestaurante: { type: String },
    isDisable: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.model("users", userSchema);
