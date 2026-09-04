import { Router } from "express";
import { createEnquiry, listEnquiries, updateEnquiry } from "../controllers/enquiries.js";
import { protect, adminOnly } from "../middleware/auth.js";
const r = Router();
r.post("/", createEnquiry);
r.get("/", protect, adminOnly, listEnquiries);
r.put("/:id", protect, adminOnly, updateEnquiry);
export default r;
