export async function POST(req: Request) {
  const { name, email, message, captcha } = await req.json();

  const secret = process.env.RECAPTCHA_SECRET_KEY;

  // Verify captcha with Google
  const response = await fetch(
    'https://www.google.com/recaptcha/api/siteverify',
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `secret=${encodeURIComponent(secret!)}&response=${encodeURIComponent(captcha)}`,
    }
  );

  const data = await response.json();

  // reCAPTCHA v2 check
  if (!data.success) {
    return new Response(
      JSON.stringify({ message: 'Captcha verification failed.' }),
      { status: 403 }
    );
  }

  // Handle your form submission here
  console.log('Form submission:', { name, email, message });

  return new Response(
    JSON.stringify({ message: 'Message sent successfully!' }),
    { status: 200 }
  );
}
