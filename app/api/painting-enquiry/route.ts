import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

interface EnquiryBody {
  name: string;
  email: string;
  paintingTitle: string;
}

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as EnquiryBody;
    const { name, email, paintingTitle } = body;

    if (!name || !email || !paintingTitle) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const { SMTP_HOST, SMTP_PORT, SMTP_SECURE, SMTP_USER, SMTP_PASS, ENQUIRY_TO } = process.env;

    if (SMTP_HOST && SMTP_USER && SMTP_PASS) {
      const transporter = nodemailer.createTransport({
        host: SMTP_HOST,
        port: Number(SMTP_PORT ?? 465),
        secure: SMTP_SECURE !== "false",
        auth: { user: SMTP_USER, pass: SMTP_PASS },
      });

      await transporter.sendMail({
        from: `"Marina Vanni Studio" <${SMTP_USER}>`,
        to: ENQUIRY_TO ?? SMTP_USER,
        replyTo: email,
        subject: `Painting enquiry — ${paintingTitle}`,
        text: `Name: ${name}\nEmail: ${email}\nPainting: ${paintingTitle}`,
        html: `
          <p style="font-family:sans-serif;font-size:14px;color:#111">
            <strong>Name:</strong> ${name}<br>
            <strong>Email:</strong> <a href="mailto:${email}">${email}</a><br>
            <strong>Painting:</strong> ${paintingTitle}
          </p>
        `,
      });
    } else {
      console.log("Painting enquiry (SMTP not configured):", { name, email, paintingTitle });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Painting enquiry error:", err);
    return NextResponse.json({ error: "Failed to send" }, { status: 500 });
  }
}
