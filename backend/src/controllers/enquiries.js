import Enquiry from "../models/Enquiry.js";
export async function createEnquiry(req, res) {
  res.status(201).json(await Enquiry.create(req.body));
}
export async function listEnquiries(req, res) {
  res.json(await Enquiry.find().sort({ createdAt: -1 }));
}
export async function updateEnquiry(req, res) {
  const item = await Enquiry.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(item);
}
