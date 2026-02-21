import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email } = body;

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { error: "Please enter a valid email address" },
        { status: 400 }
      );
    }

    if (resend) {
      const { data: existingContact } = await resend.contacts.get({
        email,
      });

      if (existingContact) {
        return NextResponse.json(
          { error: "This email is already registered on the waitlist" },
          { status: 409 }
        );
      }

      await resend.contacts.create({
        email,
      });
    }

    console.log("New waitlist signup:", email);

    if (resend) {
      try {
        await resend.emails.send({
          from: "RecoverPay waitlist <delivered@resend.dev>",
          to: email,
          subject: "You're on the RecoverPay Waitlist!",
          html: `
            <!DOCTYPE html>
            <html>
            <head>
              <meta charset="utf-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
            </head>
            <body style="margin: 0; padding: 0; background-color: #090909; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
              <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #090909; padding: 40px 20px;">
                <tr>
                  <td align="center">
                    <table width="100%" cellpadding="0" cellspacing="0" style="max-width: 500px; background-color: #1A1A1A; border-radius: 12px; border: 1px solid #2F2F2F;">
                      <!-- Logo Section -->
                      <tr>
                        <td style="padding: 40px 40px 20px 40px; text-align: center;">
                          <h1 style="margin: 0; color: #F5F5F5; font-size: 28px; font-weight: 600;">
                            RecoverPay
                          </h1>
                          <p style="margin: 8px 0 0 0; color: #8A8A8A; font-size: 14px;">
                            Automated Payment Recovery
                          </p>
                        </td>
                      </tr>
                      
                      <!-- Main Content -->
                      <tr>
                        <td style="padding: 20px 40px 40px 40px;">
                          <h2 style="margin: 0 0 16px 0; color: #F5F5F5; font-size: 20px; font-weight: 600;">
                            You're on the list! 🎉
                          </h2>
                          <p style="margin: 0 0 16px 0; color: #CFCFCF; font-size: 16px; line-height: 1.6;">
                            Thanks for joining the RecoverPay waitlist. We'll notify you as soon as we're ready to launch.
                          </p>
                          
                          <div style="background-color: #121212; border-radius: 8px; padding: 20px; margin: 24px 0;">
                            <p style="margin: 0 0 12px 0; color: #8A8A8A; font-size: 14px; text-transform: uppercase; letter-spacing: 0.5px;">
                              What is RecoverPay?
                            </p>
                            <p style="margin: 0; color: #CFCFCF; font-size: 14px; line-height: 1.6;">
                              RecoverPay is a SaaS that automatically retries failed Stripe payments using intelligent dunning schedules (1, 3, 7 days). Recover up to 60% of failed payments without manual intervention.
                            </p>
                          </div>
                          
                          <p style="margin: 0; color: #8A8A8A; font-size: 13px;">
                            Have questions? Reply to this email — we'd love to hear from you.
                          </p>
                        </td>
                      </tr>
                      
                      <!-- Footer -->
                      <tr>
                        <td style="padding: 20px 40px; border-top: 1px solid #2F2F2F; text-align: center;">
                          <p style="margin: 0; color: #6B6B6B; font-size: 12px;">
                            © 2026 RecoverPay. All rights reserved.
                          </p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </body>
            </html>
          `,
        });
      } catch (emailError) {
        console.error("Failed to send confirmation email:", emailError);
      }
    }

    return NextResponse.json(
      { message: "Successfully joined the waitlist!", email },
      { status: 200 }
    );
  } catch (error) {
    console.error("Waitlist error:", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
