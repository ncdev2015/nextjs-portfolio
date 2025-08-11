import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/dbConnect";

export async function POST(req: Request) {
  // CORS headers
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  };

  if (req.method === "OPTIONS") {
    return new NextResponse(null, { headers });
  }

  try {
    // Validate content type
    if (req.headers.get("content-type") !== "application/json") {
      return NextResponse.json(
        { message: "Invalid content type" },
        { status: 415, headers }
      );
    }

    console.log("Starting POST /api/contact");
    const { name, email, message, captcha } = await req.json();
    console.log("Received data:", { name, email, captcha: Boolean(captcha) });

    // Validate required fields
    if (!name || !email || !message || !captcha) {
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 400, headers }
      );
    }

    // Validate reCAPTCHA secret key
    const secret = process.env.RECAPTCHA_SECRET_KEY;
    if (!secret) {
      console.error("RECAPTCHA_SECRET_KEY is not configured");
      return NextResponse.json(
        { message: "Server configuration error" },
        { status: 500, headers }
      );
    }

    // Verify reCAPTCHA with timeout
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 5000);

    const response = await fetch(
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

    if (!response.ok) {
      throw new Error(`reCAPTCHA failed with status ${response.status}`);
    }

    const captchaData = await response.json();
    if (!captchaData.success) {
      return NextResponse.json(
        { message: "reCAPTCHA verification failed" },
        { status: 403, headers }
      );
    }

    // Connect to MongoDB and save the message
    const { db } = await connectToDatabase();
    const result = await db.collection("messages").insertOne({
      name,
      email,
      message,
      createdAt: new Date(),
    });

    console.log("Message saved in MongoDB with ID:", result.insertedId);

    console.log("Form submission:", { name, email, message });
    // await sendEmail({ name, email, message });

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
