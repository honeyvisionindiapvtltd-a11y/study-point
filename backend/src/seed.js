import "dotenv/config";
import bcrypt from "bcryptjs";
import { connectDB } from "./config/db.js";
import User from "./models/User.js";
import Course from "./models/Course.js";
import Announcement from "./models/Announcement.js";
import Enquiry from "./models/Enquiry.js";

await connectDB();

await Promise.all([User, Course, Announcement, Enquiry].map(model => model.createCollection()));

await User.findOneAndUpdate({ email: "admin@studypoint.com" }, { $setOnInsert: { name: "Study Point Admin", email: "admin@studypoint.com", password: await bcrypt.hash("Admin@123", 12), role: "admin" } }, { upsert: true, new: true });
await User.findOneAndUpdate({ email: "student@studypoint.com" }, { $setOnInsert: { name: "Demo Student", email: "student@studypoint.com", password: await bcrypt.hash("Student@123", 12), role: "student" } }, { upsert: true, new: true });

const catalogCourses = [
  { title: "VI to XII All Subjects", slug: "vi-to-xii-all-subjects", category: "School Coaching", level: "Classes VI–XII", duration: "Academic Year", description: "Complete academic support with strong concepts, regular practice and individual guidance.", image: "WhatsApp Image 2026-08-24 at 12.57.04 PM.jpeg" },
  { title: "CBSE Courses", slug: "cbse-courses", category: "CBSE", level: "Classes VI–XII", duration: "Academic Year", description: "Focused preparation with concept clarity, revision plans and regular assessments.", image: "A2.png" },
  { title: "ICSE Courses", slug: "icse-courses", category: "ICSE", level: "Classes VI–XII", duration: "Academic Year", description: "Detailed subject guidance designed to help students learn with confidence.", image: "A4.png" },
  { title: "JEE Main & Advanced", slug: "jee-main-advanced", category: "Engineering Preparation", level: "Classes XI–XII", duration: "2 Years", description: "Concept-first preparation with problem-solving practice, test series and expert guidance.", image: "A1.png" },
  { title: "NEET Preparation", slug: "neet-preparation", category: "Medical Preparation", level: "Classes XI–XII", duration: "2 Years", description: "Focused preparation with strong concepts, regular practice and exam-ready assessments.", image: "A3.png" },
  { title: "Foundation Course", slug: "foundation-course", category: "Classes VI–X", level: "Classes VI–X", duration: "2 Years", description: "Build strong fundamentals and confidence for future academic success through guided learning.", image: "WhatsApp Image 2026-08-24 at 3.35.35 PM.jpeg" }
];

for (const course of catalogCourses) {
  await Course.findOneAndUpdate({ slug: course.slug }, { $set: course }, { upsert: true, new: true, runValidators: true });
}
await Course.deleteMany({ slug: { $nin: catalogCourses.map(course => course.slug) } });

if (!await Announcement.exists({ title: "Admissions Open" })) await Announcement.create([
  { title: "Admissions Open", message: "New batches are now open. Contact Study Point for counselling and batch timings.", type: "Admission" },
  { title: "Weekly Test Series", message: "Weekly tests are available from the student dashboard.", type: "Academic" }
]);

console.log("Seed completed.");
process.exit(0);
