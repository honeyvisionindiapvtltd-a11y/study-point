import mongoose from "mongoose";
const schema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  password: { type: String, required: true, select: false },
  role: { type: String, enum: ["student", "teacher", "admin"], default: "student" },
  phone: String,
  avatar: String,
  isActive: { type: Boolean, default: true }
}, { timestamps: true });
export default mongoose.model("User", schema);
