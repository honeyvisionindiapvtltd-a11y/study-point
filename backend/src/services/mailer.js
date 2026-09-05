import nodemailer from "nodemailer";

const recipient = process.env.ENQUIRY_RECIPIENT || "studypointbbsr@gmail.com";

async function sendWithResend(message) {
  if (!process.env.RESEND_API_KEY) return false;
  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      from: process.env.RESEND_FROM || "Study Point <onboarding@resend.dev>",
      to: [recipient],
      reply_to: message.replyTo,
      subject: message.subject,
      text: message.text,
      html: message.html
    })
  });
  if (!response.ok) throw new Error(`Resend API ${response.status}: ${await response.text()}`);
  return true;
}

function createTransporter(port, secure) {
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, SMTP_SECURE } = process.env;
  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) return null;
  return nodemailer.createTransport({
    host: SMTP_HOST.trim(),
    port,
    secure,
    requireTLS: !secure,
    connectionTimeout: 10000,
    greetingTimeout: 10000,
    socketTimeout: 10000,
    auth: { user: SMTP_USER.trim(), pass: SMTP_PASS.replace(/\s/g, "") }
  });
}

function getTransporters() {
  const port = Number(process.env.SMTP_PORT) || 587;
  const secure = String(process.env.SMTP_SECURE).toLowerCase() === "true";
  const transporters = [createTransporter(port, secure)];
  if (port === 587) transporters.push(createTransporter(465, true));
  if (port === 465) transporters.push(createTransporter(587, false));
  return transporters.filter(Boolean);
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
  const subject = `New enquiry from ${enquiry.name}`;
  const text = [
    `Name: ${enquiry.name}`,
    `Email: ${enquiry.email}`,
    `Phone: ${enquiry.phone || "Not provided"}`,
    `Course: ${enquiry.course || "Not provided"}`,
    `Message: ${enquiry.message || "Not provided"}`
  ].join("\n");
  const html = `<h2>New Study Point enquiry</h2><p><strong>Name:</strong> ${escapeHtml(enquiry.name)}</p><p><strong>Email:</strong> ${escapeHtml(enquiry.email)}</p><p><strong>Phone:</strong> ${escapeHtml(enquiry.phone || "Not provided")}</p><p><strong>Course:</strong> ${escapeHtml(enquiry.course || "Not provided")}</p><p><strong>Message:</strong><br>${escapeHtml(enquiry.message || "Not provided").replace(/\n/g, "<br>")}</p>`;

  const message = { replyTo: enquiry.email, subject, text, html };
  if (await sendWithResend(message)) return { sent: true, configured: true, provider: "resend" };

  const transporters = getTransporters();
  if (!transporters.length) return { sent: false, configured: false };

  let lastError;
  for (const transporter of transporters) {
    try {
      await transporter.sendMail({
        from: (process.env.SMTP_FROM || process.env.SMTP_USER).trim(),
        to: recipient,
        replyTo: enquiry.email,
        subject,
        text,
        html
      });
      return { sent: true, configured: true, provider: "smtp" };
    } catch (error) {
      lastError = error;
    }
  }
  throw lastError;
}
