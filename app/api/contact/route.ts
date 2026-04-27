import { NextRequest, NextResponse } from "next/server"
import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: NextRequest) {
  const { name, email, message, turnstileToken } = await req.json()

  if (!name || !email || !message || !turnstileToken) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 })
  }

  // Verify Turnstile token
  const verifyRes = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      secret: process.env.TURNSTILE_SECRET_KEY,
      response: turnstileToken,
    }),
  })
  const verifyData = await verifyRes.json()
  if (!verifyData.success) {
    return NextResponse.json({ error: "Bot detected" }, { status: 403 })
  }

  // Send email via Resend
  const { error } = await resend.emails.send({
    from: "Portfolio Contact <contact@manojachari.com>",
    to: "manojacharimanages@gmail.com",
    replyTo: email,
    subject: `[Portfolio] Message from ${name}`,
    text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
  })

  if (error) {
    return NextResponse.json({ error: "Failed to send" }, { status: 500 })
  }

  return NextResponse.json({ success: true })
}
