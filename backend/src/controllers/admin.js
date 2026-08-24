import User from "../models/User.js";
import Course from "../models/Course.js";
import Enquiry from "../models/Enquiry.js";
import Announcement from "../models/Announcement.js";

export async function stats(req, res) {
  const [students, courses, enquiries, announcements] = await Promise.all([
    User.countDocuments({ role: "student" }),
    Course.countDocuments(),
    Enquiry.countDocuments(),
    Announcement.countDocuments()
  ]);
  res.json({ students, courses, enquiries, announcements });
}
