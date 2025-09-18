// app/utils/email.server.ts
import nodemailer from "nodemailer";

interface EmailData {
  name: string;
  email: string;
  media?: File | null;
}

export async function sendEmail(
  {
    subject,
    content,
  }: {
    subject: string;
    content: any;
  },
  media: File | null = null
) {
  // Create a transporter object
  const transporter = nodemailer.createTransport({
    service: "gmail", // You can use other services or your SMTP server
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
  // Prepare attachments
  const attachments = media
    ? [
        {
          filename: media.name,
          content: Buffer.from(await media.arrayBuffer()),
        },
      ]
    : [];

  // Email content
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.TO_ADDRESS,
    subject,
    html: content,
    attachments,
  };

  // Send email
  return transporter.sendMail(mailOptions as any);
}
