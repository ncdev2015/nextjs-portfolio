export async function POST(req: Request) {
  const { name, email, message, captcha } = await req.json();

  const secret = process.env.RECAPTCHA_SECRET;
  
  const response = await fetch(
    `https://www.google.com/recaptcha/api/siteverify`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `secret=${secret}&response=${captcha}`,
    }
  );

  const data = await response.json();

  if (!data.success) {
    return new Response(JSON.stringify({ message: 'Captcha validation failed' }), { status: 400 });
  }

  // reCAPTCHA v3-specific: check score
  if (data.score < 0.5 || data.action !== 'contact') {
    return new Response(JSON.stringify({ message: 'Captcha score too low.' }), { status: 403 });
  }

  // Handle your form submission here (e.g. send email, save to DB)
  console.log({ name, email, message });

  return new Response(JSON.stringify({ message: 'Message sent successfully!' }), { status: 200 });
}
