import Course from "../models/Course.js";

export async function listCourses(req, res) {
  const filter = req.query.status ? { status: req.query.status } : {};
  res.json(await Course.find(filter).sort({ createdAt: -1 }));
}

export async function getCourse(req, res) {
  const course = await Course.findOne({ slug: req.params.slug });
  if (!course) return res.status(404).json({ message: "Course not found" });
  res.json(course);
}

export async function createCourse(req, res) {
  const course = await Course.create(req.body);
  res.status(201).json(course);
}

export async function updateCourse(req, res) {
  const course = await Course.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
  if (!course) return res.status(404).json({ message: "Course not found" });
  res.json(course);
}

export async function deleteCourse(req, res) {
  await Course.findByIdAndDelete(req.params.id);
  res.json({ message: "Course deleted" });
}
