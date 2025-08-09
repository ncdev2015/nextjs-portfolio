"use client";

import { useState, useEffect } from "react";

export default function Contact() {
  const [status, setStatus] = useState("");
  const [statusType, setStatusType] = useState<"success" | "error" | "">("");

  // Load reCAPTCHA v2 script on component mount
  useEffect(() => {
    const script = document.createElement("script");
    script.src = `https://www.google.com/recaptcha/api.js`;
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);

    // Get token from reCAPTCHA v2 checkbox
    // Define grecaptcha type on window
    interface Grecaptcha {
      getResponse: () => string;
      reset: () => void;
    }
    interface WindowWithGrecaptcha extends Window {
      grecaptcha: Grecaptcha;
    }
    const token = (
      window as unknown as WindowWithGrecaptcha
    ).grecaptcha.getResponse();

    if (!token) {
      setStatusType("error");
      setStatus("⚠️ Please verify you are not a robot.");
      return;
    }

    const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/contact`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: formData.get("name"),
        email: formData.get("email"),
        message: formData.get("message"),
        captcha: token,
      }),
    });

    if (!res.ok) {
      const errorData = await res.json();
      setStatusType("error");
      setStatus(`❌ ${errorData.message || "Failed to send the message."}`);
      return;
    }

    if (res.ok) {
      setStatusType("success");
      setStatus("Message sent successfully!");
      form.reset();
      (
        window as unknown as Window & { grecaptcha: { reset: () => void } }
      ).grecaptcha.reset();
    } else {
      setStatusType("error");
      setStatus("Failed to send the message. Please try again.");
    }

    // Auto-hide status after 5 seconds
    setTimeout(() => {
      setStatus("");
      setStatusType("");
    }, 5000);
  };

  return (
    <section id="contact" className="py-4 px-4 max-w-2xl mx-auto">
      <h2 className="text-3xl font-semibold mb-6 text-center">Contact</h2>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-100"
          >
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            className="mt-1 w-full border border-gray-300 rounded-md p-2 bg-gray-100 text-black"
            required
          />
        </div>

        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-100"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="mt-1 w-full border border-gray-300 rounded-md p-2 bg-gray-100 text-black"
            required
          />
        </div>

        <div>
          <label
            htmlFor="message"
            className="block text-sm font-medium text-gray-100"
          >
            Message
          </label>
          <textarea
            id="message"
            name="message"
            rows={4}
            minLength={20}
            className="mt-1 w-full border border-gray-300 rounded-md p-2 bg-gray-100 text-black"
            required
          />
        </div>

        {/* reCAPTCHA v2 checkbox */}
        <div
          className="g-recaptcha"
          data-sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
        ></div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors cursor-pointer"
        >
          Send message
        </button>

        {/* Status message */}
        {status && (
          <div
            className={`mt-4 text-center p-3 rounded-md ${
              statusType === "success"
                ? "bg-green-500 text-white"
                : "bg-red-500 text-white"
            }`}
          >
            {status}
          </div>
        )}
      </form>
    </section>
  );
}
