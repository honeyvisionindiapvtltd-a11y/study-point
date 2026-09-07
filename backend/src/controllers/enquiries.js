import Enquiry from "../models/Enquiry.js";
import { sendEnquiryNotification } from "../services/mailer.js";

function validEmail(email) {
  return typeof email === "string" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

function validPhone(phone) {
  if (typeof phone !== "string") return false;
  const value = phone.trim();
  return /^[6-9]\d{9}$/.test(value) && !/^(\d)\1{9}$/.test(value);
}

export async function createEnquiry(req, res) {
  const { name, email, phone, course, message } = req.body;
  if (typeof name !== "string" || !name.trim() || !validEmail(email) || !validPhone(phone)) {
    return res.status(422).json({ success: false, message: "Enter a valid 10-digit mobile number" });
  }

  const enquiry = await Enquiry.create({
    name: name.trim(),
    email: email.trim().toLowerCase(),
    phone: typeof phone === "string" ? phone.trim() : "",
    course: typeof course === "string" ? course.trim() : "",
    message: typeof message === "string" ? message.trim() : ""
  });

  sendEnquiryNotification(enquiry)
    .then(result => console.log(`Enquiry ${enquiry._id} email sent: ${result.sent}`))
    .catch(error => console.error("Unable to send enquiry notification:", error));

  res.status(201).json({ success: true, enquiry, emailQueued: true });
}
export async function listEnquiries(req, res) {
  res.json(await Enquiry.find().sort({ createdAt: -1 }));
}
export async function updateEnquiry(req, res) {
  const item = await Enquiry.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(item);
}
