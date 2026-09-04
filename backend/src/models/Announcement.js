import mongoose from "mongoose";
const schema = new mongoose.Schema({
  title: { type: String, required: true },
  message: { type: String, required: true },
  type: { type: String, default: "General" },
  published: { type: Boolean, default: true }
}, { timestamps: true });
export default mongoose.model("Announcement", schema);
