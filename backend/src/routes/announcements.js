import { Router } from "express";
import { listAnnouncements, createAnnouncement } from "../controllers/announcements.js";
import { protect, adminOnly } from "../middleware/auth.js";
const r = Router();
r.get("/", listAnnouncements);
r.post("/", protect, adminOnly, createAnnouncement);
export default r;
