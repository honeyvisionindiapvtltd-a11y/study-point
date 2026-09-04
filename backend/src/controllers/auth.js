import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

function tokenFor(user) {
  return jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN || "7d" });
}

function publicUser(user) {
  return { id: user._id, name: user.name, email: user.email, role: user.role, phone: user.phone, avatar: user.avatar, isActive: user.isActive };
}

function validEmail(email) { return typeof email === "string" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()); }

export async function register(req, res) {
  const { name, email, password, phone } = req.body;
  if (typeof name !== "string" || !name.trim() || !validEmail(email) || typeof password !== "string" || !password) return res.status(422).json({ success: false, message: "A valid name, email and password are required" });
  if (password.length < 8) return res.status(422).json({ success: false, message: "Password must be at least 8 characters" });
  const normalizedEmail = email.trim().toLowerCase();
  const exists = await User.findOne({ email: normalizedEmail });
  if (exists) return res.status(409).json({ message: "Email already registered" });
  const user = await User.create({ name, email: normalizedEmail, phone, password: await bcrypt.hash(password, 12), role: "student" });
  res.status(201).json({ success: true, message: "Registration successful", token: tokenFor(user), user: publicUser(user) });
}

export async function login(req, res) {
  const { email, password } = req.body;
  const user = await User.findOne({ email: typeof email === "string" ? email.trim().toLowerCase() : "" }).select("+password");
  if (!user || !user.isActive || !(await bcrypt.compare(password || "", user.password))) {
    return res.status(401).json({ message: "Invalid email or password" });
  }
  res.json({ success: true, message: "Login successful", token: tokenFor(user), user: publicUser(user) });
}

export async function me(req, res) {
  res.json({ success: true, user: publicUser(req.user) });
}

export async function logout(req, res) {
  res.json({ success: true, message: "Logged out successfully" });
}

export async function updateProfile(req, res) {
  const { name, phone, avatar, password, currentPassword } = req.body;
  const user = await User.findById(req.user._id).select("+password");
  if (name !== undefined) {
    if (typeof name !== "string" || !name.trim()) return res.status(422).json({ success: false, message: "Name cannot be empty" });
    user.name = name.trim();
  }
  if (phone !== undefined) user.phone = phone;
  if (avatar !== undefined) user.avatar = avatar;
  if (password !== undefined) {
    if (typeof password !== "string" || !currentPassword || !(await bcrypt.compare(currentPassword, user.password))) return res.status(401).json({ success: false, message: "Current password is incorrect" });
    if (password.length < 8) return res.status(422).json({ success: false, message: "Password must be at least 8 characters" });
    user.password = await bcrypt.hash(password, 12);
  }
  await user.save();
  res.json({ success: true, user: publicUser(user) });
}
