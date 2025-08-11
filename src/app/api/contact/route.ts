import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const { name, email, message, captcha } = await req.json();

    // Check required fields
    if (!name || !email || !message || !captcha) {
      return NextResponse.json(
        { message: 'All fields are required' },
        { status: 400 }
      );
    }

    // Check captcha
    const secret = process.env.RECAPTCHA_SECRET_KEY;
    if (!secret) {
      console.error('RECAPTCHA_SECRET_KEY is missing');
      return NextResponse.json(
        { message: 'Server configuration error' },
        { status: 500 }
      );
    }

    const response = await fetch(
      'https://www.google.com/recaptcha/api/siteverify',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `secret=${encodeURIComponent(secret)}&response=${encodeURIComponent(captcha)}`,
      }
    );

    const captchaData = await response.json();

    if (!captchaData.success) {
      return NextResponse.json(
        { message: 'Captcha verification failed' },
        { status: 403 }
      );
    }

    // Process the contact form (e.g., send an email)
    console.log('Form submission:', { name, email, message });

    // Example with nodemailer
    // await sendEmail({ name, email, message });

    return NextResponse.json(
      { message: 'Message sent successfully!' },
      { status: 200 }
    );

  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}