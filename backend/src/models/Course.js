import mongoose from "mongoose";
const schema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  description: String,
  category: String,
  level: String,
  duration: String,
  fee: Number,
  image: String,
  featured: { type: Boolean, default: false },
  status: { type: String, enum: ["active", "draft"], default: "active" },
  subjects: [{ type: String }],
  instructor: String
}, { timestamps: true });
export default mongoose.model("Course", schema);
