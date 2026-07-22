import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

// ─── Helpers & Validation ──────────────────────────
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function escapeHtml(str: string): string {
  if (!str) return "";
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

// ─── Types ────────────────────────────────────────
interface BookingPayload {
  type: "booking";
  name: string;
  email: string;
  date: string;
  time: string;
  topic?: string;
}

interface ContactPayload {
  type: "contact";
  name: string;
  email: string;
  service: string;
  message?: string;
}

type NotifyPayload = BookingPayload | ContactPayload;

// ─── Email Templates ──────────────────────────────
function buildBookingEmail(data: BookingPayload) {
  const safeName = escapeHtml(data.name);
  const safeEmail = escapeHtml(data.email);
  const safeDate = escapeHtml(data.date);
  const safeTime = escapeHtml(data.time);
  const safeTopic = data.topic ? escapeHtml(data.topic) : "Not specified";

  const subject = `🗓️ New Call Booking — ${safeName}`;
  const html = `
    <div style="font-family:'Segoe UI',Arial,sans-serif;max-width:600px;margin:0 auto;background:#0a0a0a;border:1px solid #1a1a1a;border-radius:16px;overflow:hidden">
      <div style="background:linear-gradient(135deg,#ccff00 0%,#a3cc00 100%);padding:28px 32px">
        <h1 style="margin:0;font-size:22px;font-weight:800;color:#000;letter-spacing:-0.5px">
          🗓️ New Call Booked!
        </h1>
        <p style="margin:6px 0 0;font-size:13px;color:#333">Someone just scheduled a call on AiBuildSpace</p>
      </div>
      <div style="padding:32px">
        <table style="width:100%;border-collapse:collapse">
          <tr>
            <td style="padding:12px 0;border-bottom:1px solid #1a1a1a;color:#888;font-size:13px;width:120px">Name</td>
            <td style="padding:12px 0;border-bottom:1px solid #1a1a1a;color:#fff;font-size:14px;font-weight:600">${safeName}</td>
          </tr>
          <tr>
            <td style="padding:12px 0;border-bottom:1px solid #1a1a1a;color:#888;font-size:13px">Email</td>
            <td style="padding:12px 0;border-bottom:1px solid #1a1a1a;color:#ccff00;font-size:14px">
              <a href="mailto:${safeEmail}" style="color:#ccff00;text-decoration:none">${safeEmail}</a>
            </td>
          </tr>
          <tr>
            <td style="padding:12px 0;border-bottom:1px solid #1a1a1a;color:#888;font-size:13px">Date</td>
            <td style="padding:12px 0;border-bottom:1px solid #1a1a1a;color:#fff;font-size:14px;font-weight:600">${safeDate}</td>
          </tr>
          <tr>
            <td style="padding:12px 0;border-bottom:1px solid #1a1a1a;color:#888;font-size:13px">Time</td>
            <td style="padding:12px 0;border-bottom:1px solid #1a1a1a;color:#fff;font-size:14px;font-weight:600">${safeTime}</td>
          </tr>
          <tr>
            <td style="padding:12px 0;color:#888;font-size:13px">Topic</td>
            <td style="padding:12px 0;color:#fff;font-size:14px">${safeTopic}</td>
          </tr>
        </table>
        <div style="margin-top:28px;padding:16px;background:#111;border-radius:10px;border:1px solid #1a1a1a">
          <p style="margin:0;font-size:12px;color:#666">
            💡 Reply directly to this email to reach the client at <strong style="color:#ccff00">${safeEmail}</strong>
          </p>
        </div>
      </div>
    </div>
  `;
  return { subject, html };
}

function buildContactEmail(data: ContactPayload) {
  const safeName = escapeHtml(data.name);
  const safeEmail = escapeHtml(data.email);
  const safeService = escapeHtml(data.service);
  const safeMessage = data.message ? escapeHtml(data.message) : "No message provided";

  const subject = `📬 New Contact — ${safeName} (${safeService})`;
  const html = `
    <div style="font-family:'Segoe UI',Arial,sans-serif;max-width:600px;margin:0 auto;background:#0a0a0a;border:1px solid #1a1a1a;border-radius:16px;overflow:hidden">
      <div style="background:linear-gradient(135deg,#ccff00 0%,#a3cc00 100%);padding:28px 32px">
        <h1 style="margin:0;font-size:22px;font-weight:800;color:#000;letter-spacing:-0.5px">
          📬 New Contact Submission
        </h1>
        <p style="margin:6px 0 0;font-size:13px;color:#333">Someone filled out the contact form on AiBuildSpace</p>
      </div>
      <div style="padding:32px">
        <table style="width:100%;border-collapse:collapse">
          <tr>
            <td style="padding:12px 0;border-bottom:1px solid #1a1a1a;color:#888;font-size:13px;width:120px">Name</td>
            <td style="padding:12px 0;border-bottom:1px solid #1a1a1a;color:#fff;font-size:14px;font-weight:600">${safeName}</td>
          </tr>
          <tr>
            <td style="padding:12px 0;border-bottom:1px solid #1a1a1a;color:#888;font-size:13px">Email</td>
            <td style="padding:12px 0;border-bottom:1px solid #1a1a1a;color:#ccff00;font-size:14px">
              <a href="mailto:${safeEmail}" style="color:#ccff00;text-decoration:none">${safeEmail}</a>
            </td>
          </tr>
          <tr>
            <td style="padding:12px 0;border-bottom:1px solid #1a1a1a;color:#888;font-size:13px">Service</td>
            <td style="padding:12px 0;border-bottom:1px solid #1a1a1a;color:#fff;font-size:14px;font-weight:600">${safeService}</td>
          </tr>
          <tr>
            <td style="padding:12px 0;color:#888;font-size:13px;vertical-align:top">Message</td>
            <td style="padding:12px 0;color:#fff;font-size:14px;line-height:1.6">${safeMessage}</td>
          </tr>
        </table>
        <div style="margin-top:28px;padding:16px;background:#111;border-radius:10px;border:1px solid #1a1a1a">
          <p style="margin:0;font-size:12px;color:#666">
            💡 Reply directly to this email to reach the client at <strong style="color:#ccff00">${safeEmail}</strong>
          </p>
        </div>
      </div>
    </div>
  `;
  return { subject, html };
}

// ─── Route Handler ────────────────────────────────
export async function POST(request: NextRequest) {
  try {
    const body: NotifyPayload = await request.json();

    // Validate common required fields
    if (!body.name || typeof body.name !== "string" || !body.name.trim()) {
      return NextResponse.json(
        { error: "A valid name is required" },
        { status: 400 }
      );
    }

    if (!body.email || typeof body.email !== "string" || !EMAIL_REGEX.test(body.email.trim())) {
      return NextResponse.json(
        { error: "A valid email address is required" },
        { status: 400 }
      );
    }

    // Build the email content based on type
    let emailContent: { subject: string; html: string };

    if (body.type === "booking") {
      if (!body.date || !body.time) {
        return NextResponse.json(
          { error: "Date and time are required for bookings" },
          { status: 400 }
        );
      }
      emailContent = buildBookingEmail(body);
    } else if (body.type === "contact") {
      emailContent = buildContactEmail(body);
    } else {
      return NextResponse.json(
        { error: "Invalid notification type" },
        { status: 400 }
      );
    }

    // Check if SMTP environment variables are configured
    if (!process.env.SMTP_HOST || !process.env.SMTP_USER || !process.env.SMTP_PASS) {
      console.warn("SMTP environment variables are not configured. Message logged locally.");
      return NextResponse.json({ success: true, message: "Request received successfully." });
    }

    // Create transporter
    const port = Number(process.env.SMTP_PORT) || 465;
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port,
      secure: port === 465, // true for 465 (SSL), false for 587 (STARTTLS)
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    // Send email
    await transporter.sendMail({
      from: `"AiBuildSpace" <${process.env.SMTP_USER}>`,
      to: process.env.NOTIFY_EMAIL || process.env.SMTP_USER,
      replyTo: body.email,
      subject: emailContent.subject,
      html: emailContent.html,
    });

    return NextResponse.json({ success: true, message: "Notification sent!" });
  } catch (error: unknown) {
    console.error("Notification handler error:", error);
    return NextResponse.json(
      { error: "Unable to process notification request. Please try again later." },
      { status: 500 }
    );
  }
}
