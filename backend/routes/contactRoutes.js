import express from "express";
import nodemailer from "nodemailer";

const router = express.Router();

const escapeHtml = (value) =>
  String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");

router.post("/", async (req, res) => {
  const { name, email, subject, message } = req.body;

  if (!name || !email || !subject || !message) {
    return res.status(400).json({ message: "Please fill in every contact field." });
  }

  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS } = process.env;
  const CONTACT_RECEIVER_EMAIL = process.env.CONTACT_RECEIVER_EMAIL || "kishudarji2612@gmail.com";

  if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASS || !CONTACT_RECEIVER_EMAIL) {
    return res.status(500).json({ message: "Contact email is not configured yet." });
  }

  try {
    const transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: Number(SMTP_PORT),
      secure: Number(SMTP_PORT) === 465,
      auth: {
        user: SMTP_USER,
        pass: SMTP_PASS,
      },
    });

    await transporter.sendMail({
      from: `"BrewNest Contact" <${SMTP_USER}>`,
      to: CONTACT_RECEIVER_EMAIL,
      replyTo: email,
      subject: `BrewNest Contact: ${subject}`,
      text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #2B160D;">
          <h2>New BrewNest contact message</h2>
          <p><strong>Name:</strong> ${escapeHtml(name)}</p>
          <p><strong>Email:</strong> ${escapeHtml(email)}</p>
          <p><strong>Subject:</strong> ${escapeHtml(subject)}</p>
          <p><strong>Message:</strong></p>
          <p>${escapeHtml(message).replace(/\n/g, "<br />")}</p>
        </div>
      `,
    });

    res.json({ message: "Message sent successfully." });
  } catch (error) {
    console.error("Contact email failed:", error);
    res.status(500).json({ message: "Email could not be sent. Please check SMTP settings." });
  }
});

export default router;
