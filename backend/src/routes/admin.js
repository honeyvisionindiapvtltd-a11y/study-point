import { Router } from "express";
import { stats } from "../controllers/admin.js";
import { protect, adminOnly } from "../middleware/auth.js";
const r = Router();
r.get("/stats", protect, adminOnly, stats);
export default r;
