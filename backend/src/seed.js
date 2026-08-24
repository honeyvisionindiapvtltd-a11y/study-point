import "dotenv/config";
import bcrypt from "bcryptjs";
import { connectDB } from "./config/db.js";
import User from "./models/User.js";
import Course from "./models/Course.js";
import Announcement from "./models/Announcement.js";

await connectDB();

await User.deleteMany({});
await Course.deleteMany({});
await Announcement.deleteMany({});

await User.create([
  { name: "Study Point Admin", email: "admin@studypoint.com", password: await bcrypt.hash("Admin@123", 12), role: "admin" },
  { name: "Demo Student", email: "student@studypoint.com", password: await bcrypt.hash("Student@123", 12), role: "student" }
]);

await Course.create([
  { title: "JEE Foundation", slug: "jee-foundation", description: "Build strong fundamentals for competitive exams with structured learning.", category: "Engineering", level: "Foundation", duration: "12 Months", fee: 45000, featured: true, instructor: "Study Point Faculty", subjects: ["Physics", "Chemistry", "Mathematics"] },
  { title: "NEET Excellence", slug: "neet-excellence", description: "Concept-focused preparation with regular tests and progress tracking.", category: "Medical", level: "Advanced", duration: "12 Months", fee: 50000, featured: true, instructor: "Study Point Faculty", subjects: ["Physics", "Chemistry", "Biology"] },
  { title: "Board Exam Mastery", slug: "board-exam-mastery", description: "Complete school curriculum support with notes, tests and doubt sessions.", category: "School", level: "Class 10–12", duration: "10 Months", fee: 28000, featured: false, instructor: "Study Point Faculty", subjects: ["Mathematics", "Science", "English"] }
]);

await Announcement.create([
  { title: "Admissions Open", message: "New batches are now open. Contact Study Point for counselling and batch timings.", type: "Admission" },
  { title: "Weekly Test Series", message: "Weekly tests are available from the student dashboard.", type: "Academic" }
]);

console.log("Seed completed.");
process.exit(0);
