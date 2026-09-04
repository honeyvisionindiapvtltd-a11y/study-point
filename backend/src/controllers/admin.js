import User from "../models/User.js";
import Course from "../models/Course.js";
import Enquiry from "../models/Enquiry.js";
import Announcement from "../models/Announcement.js";
import bcrypt from "bcryptjs";
import mongoose from "mongoose";

export async function stats(req, res) {
  const [students, teachers, courses, enquiries, announcements] = await Promise.all([
    User.countDocuments({ role: "student" }),
    User.countDocuments({ role: "teacher" }),
    Course.countDocuments(),
    Enquiry.countDocuments(),
    Announcement.countDocuments()
  ]);
  res.json({ students, teachers, courses, enquiries, announcements });
}

function validId(id) { return mongoose.Types.ObjectId.isValid(id); }
function safeTeacher(user) { return { id: user._id, name: user.name, email: user.email, role: user.role, phone: user.phone, avatar: user.avatar, isActive: user.isActive, createdAt: user.createdAt }; }
function validEmail(email) { return typeof email === "string" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()); }

export async function listTeachers(req, res) { res.json(await User.find({ role: "teacher" }).sort({ createdAt: -1 })); }
export async function getTeacher(req, res) {
  if (!validId(req.params.id)) return res.status(404).json({ message: "Teacher not found" });
  const teacher = await User.findOne({ _id: req.params.id, role: "teacher" });
  if (!teacher) return res.status(404).json({ message: "Teacher not found" });
  res.json(safeTeacher(teacher));
}
export async function createTeacher(req, res) {
  const { name, email, password, phone, avatar } = req.body;
  if (typeof name !== "string" || !name.trim() || !validEmail(email) || typeof password !== "string" || !password) return res.status(422).json({ success: false, message: "A valid name, email and password are required" });
  if (password.length < 8) return res.status(422).json({ success: false, message: "Password must be at least 8 characters" });
  const normalizedEmail = email.trim().toLowerCase();
  if (await User.findOne({ email: normalizedEmail })) return res.status(409).json({ message: "Email already registered" });
  const teacher = await User.create({ name, email: normalizedEmail, phone, avatar, role: "teacher", password: await bcrypt.hash(password, 12) });
  res.status(201).json(safeTeacher(teacher));
}
export async function updateTeacher(req, res) {
  if (!validId(req.params.id)) return res.status(404).json({ message: "Teacher not found" });
  const teacher = await User.findOne({ _id: req.params.id, role: "teacher" }).select("+password");
  if (!teacher) return res.status(404).json({ message: "Teacher not found" });
  const { name, email, phone, avatar, password } = req.body;
  if (name !== undefined) teacher.name = name;
  if (email !== undefined) {
    if (!validEmail(email)) return res.status(422).json({ success: false, message: "A valid email is required" });
    teacher.email = email.trim().toLowerCase();
  }
  if (phone !== undefined) teacher.phone = phone;
  if (avatar !== undefined) teacher.avatar = avatar;
  if (password !== undefined) {
    if (typeof password !== "string") return res.status(422).json({ success: false, message: "Password must be at least 8 characters" });
    if (password.length < 8) return res.status(422).json({ message: "Password must be at least 8 characters" });
    teacher.password = await bcrypt.hash(password, 12);
  }
  await teacher.save();
  res.json(safeTeacher(teacher));
}
export async function setTeacherStatus(req, res) {
  if (!validId(req.params.id)) return res.status(404).json({ message: "Teacher not found" });
  if (typeof req.body.isActive !== "boolean") return res.status(422).json({ success: false, message: "isActive must be a boolean" });
  const teacher = await User.findOneAndUpdate({ _id: req.params.id, role: "teacher" }, { isActive: req.body.isActive }, { new: true, runValidators: true });
  if (!teacher) return res.status(404).json({ message: "Teacher not found" });
  res.json(safeTeacher(teacher));
}
export async function deleteTeacher(req, res) {
  if (!validId(req.params.id)) return res.status(404).json({ message: "Teacher not found" });
  const teacher = await User.findOneAndUpdate({ _id: req.params.id, role: "teacher" }, { isActive: false }, { new: true });
  if (!teacher) return res.status(404).json({ message: "Teacher not found" });
  res.json({ success: true, message: "Teacher deactivated" });
}
