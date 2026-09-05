import nodemailer from "nodemailer";

const recipient = process.env.ENQUIRY_RECIPIENT || "studypointbbsr@gmail.com";

function getTransporter() {
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, SMTP_SECURE } = process.env;
  if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASS) return null;
  return nodemailer.createTransport({
    host: SMTP_HOST,
    port: Number(SMTP_PORT),
    secure: String(SMTP_SECURE).toLowerCase() === "true",
    auth: { user: SMTP_USER, pass: SMTP_PASS }
  });
}

function escapeHtml(value = "") {
  return String(value).replace(/[&<>'"]/g, character => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    "'": "&#39;",
    "\"": "&quot;"
  })[character]);
}

export async function sendEnquiryNotification(enquiry) {
  const transporter = getTransporter();
  if (!transporter) return { sent: false, configured: false };

  const subject = `New enquiry from ${enquiry.name}`;
  const text = [
    `Name: ${enquiry.name}`,
    `Email: ${enquiry.email}`,
    `Phone: ${enquiry.phone || "Not provided"}`,
    `Course: ${enquiry.course || "Not provided"}`,
    `Message: ${enquiry.message || "Not provided"}`
  ].join("\n");
  const html = `<h2>New Study Point enquiry</h2><p><strong>Name:</strong> ${escapeHtml(enquiry.name)}</p><p><strong>Email:</strong> ${escapeHtml(enquiry.email)}</p><p><strong>Phone:</strong> ${escapeHtml(enquiry.phone || "Not provided")}</p><p><strong>Course:</strong> ${escapeHtml(enquiry.course || "Not provided")}</p><p><strong>Message:</strong><br>${escapeHtml(enquiry.message || "Not provided").replace(/\n/g, "<br>")}</p>`;

  await transporter.sendMail({
    from: process.env.SMTP_FROM || process.env.SMTP_USER,
    to: recipient,
    replyTo: enquiry.email,
    subject,
    text,
    html
  });
  return { sent: true, configured: true };
}
