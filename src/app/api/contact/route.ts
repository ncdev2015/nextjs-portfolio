import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/dbConnect";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  };

  if (req.method === "OPTIONS") {
    return new NextResponse(null, { headers });
  }

  try {
    if (req.headers.get("content-type") !== "application/json") {
      return NextResponse.json(
        { message: "Invalid content type" },
        { status: 415, headers }
      );
    }

    const { name, email, message, captcha } = await req.json();

    if (!name || !email || !message || !captcha) {
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 400, headers }
      );
    }

    // reCAPTCHA verification
    const secret = process.env.RECAPTCHA_SECRET_KEY;
    if (!secret) {
      return NextResponse.json(
        { message: "Server configuration error" },
        { status: 500, headers }
      );
    }

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 5000);

    const captchaResponse = await fetch(
      "https://www.google.com/recaptcha/api/siteverify",
      {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: `secret=${encodeURIComponent(
          secret
        )}&response=${encodeURIComponent(captcha)}`,
        signal: controller.signal,
      }
    ).finally(() => clearTimeout(timeout));

    if (!captchaResponse.ok) {
      throw new Error(`reCAPTCHA failed with status ${captchaResponse.status}`);
    }

    const captchaData = await captchaResponse.json();
    if (!captchaData.success) {
      return NextResponse.json(
        { message: "reCAPTCHA verification failed" },
        { status: 403, headers }
      );
    }

    // Save to MongoDB
    const { db } = await connectToDatabase();
    const result = await db.collection("messages").insertOne({
      name,
      email,
      message,
      createdAt: new Date(),
    });

    // Send email with Resend
    await resend.emails.send({
      from: "Web Portfolio <onboarding@resend.dev>", // You can change this to your desired sender
      to: process.env.MY_EMAIL as string,
      subject: `New message from ${name}`,
      html: `
        <h3>New message from web portfolio</h3>
        <p><b>Name:</b> ${name}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Message:</b></p>
        <p>${message}</p>
      `,
    });

    return NextResponse.json(
      {
        success: true,
        message: "Message sent successfully",
        mongoId: result.insertedId,
      },
      { status: 200, headers }
    );
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500, headers }
    );
  }
}
