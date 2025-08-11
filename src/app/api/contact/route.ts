import { NextResponse } from "next/server";

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

    console.log("Initializing POST /api/contact");
    const { name, email, message, captcha } = await req.json();
    console.log("Received data:", {
      name,
      email,
      message,
      captcha: Boolean(captcha),
    });

    // Validate required fields
    if (!name || !email || !message || !captcha) {
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 400, headers }
      );
    }

    // Validate reCAPTCHA secret key
    const secret = process.env.RECAPTCHA_SECRET_KEY;
    console.log("RECAPTCHA_SECRET_KEY:", Boolean(secret));

    if (!secret) {
      console.error("RECAPTCHA_SECRET_KEY is missing");
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
    console.log("reCAPTCHA response:", captchaData);

    if (!captchaData.success) {
      return NextResponse.json(
        { message: "Captcha verification failed" },
        { status: 403, headers }
      );
    }

    // Process form (e.g., send email)
    console.log("Form submission:", { name, email, message });
    // await sendEmail({ name, email, message });

    return NextResponse.json(
      { message: "Message sent successfully!" },
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
