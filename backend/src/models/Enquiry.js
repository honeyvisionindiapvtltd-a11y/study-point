import mongoose from "mongoose";
const schema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: String,
  course: String,
  message: String,
  status: { type: String, enum: ["new", "contacted", "closed"], default: "new" }
}, { timestamps: true });
export default mongoose.model("Enquiry", schema);
