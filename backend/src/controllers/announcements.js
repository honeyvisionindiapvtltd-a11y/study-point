import Announcement from "../models/Announcement.js";
export async function listAnnouncements(req, res) {
  res.json(await Announcement.find({ published: true }).sort({ createdAt: -1 }).limit(20));
}
export async function createAnnouncement(req, res) {
  res.status(201).json(await Announcement.create(req.body));
}
