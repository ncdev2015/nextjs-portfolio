export async function POST(req: Request) {
  const { name, email, message, captcha } = await req.json();

  const secret = process.env.RECAPTCHA_SECRET;
  const response = await fetch(
    `https://www.google.com/recaptcha/api/siteverify?secret=${secret}&response=${captcha}`,
    { method: 'POST' }
  );

  const data = await response.json();

  if (!data.success) {
    return new Response(JSON.stringify({ message: 'Captcha validation failed' }), { status: 400 });
  }

  // Handle your form submission here
  console.log({ name, email, message });

  return new Response(JSON.stringify({ message: 'Message sent successfully!' }), { status: 200 });
}
