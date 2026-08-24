import mongoose from "mongoose";
const schema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  password: { type: String, required: true, select: false },
  role: { type: String, enum: ["student", "admin"], default: "student" },
  phone: String,
  avatar: String
}, { timestamps: true });
export default mongoose.model("User", schema);
