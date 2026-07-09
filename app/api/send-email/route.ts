import { NextResponse } from 'next/server';

export const runtime = 'edge';

export async function POST(request: Request) {
  try {
    const { firstName, lastName, email, result } = await request.json();

    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      console.warn("RESEND_API_KEY is not defined in environment variables. Email sending skipped.");
      return NextResponse.json({ 
        success: false, 
        error: "RESEND_API_KEY is missing. Please add it to your .env.local file." 
      }, { status: 400 });
    }

    // Determine sender email. Resend requires verified domains, fallback to onboarding@resend.dev for test
    const fromEmail = process.env.RESEND_FROM_EMAIL || 'Allie Pasag <onboarding@resend.dev>';
    
    // Encode parameters for the booking link inside the email
    const bookingUrl = `https://bookme.name/askalliepasag/lite/discovery-call?firstname=${encodeURIComponent(firstName)}&lastname=${encodeURIComponent(lastName)}&email=${encodeURIComponent(email)}`;

    // Beautiful, high-end, responsive HTML email matching the dark results page theme
    const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Your Strategy & Diagnostics Report</title>
</head>
<body style="margin: 0; padding: 0; background-color: #0d0d0d; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; -webkit-font-smoothing: antialiased;">
  <table border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #0d0d0d; padding: 40px 10px;">
    <tr>
      <td align="center">
        <!-- Main Content Card -->
        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px; background-color: #111111; border: 1px solid #222222; border-radius: 16px; overflow: hidden; border-spacing: 0;">
          
          <!-- Top Accent Line -->
          <tr>
            <td height="4" style="background-color: #E040FB;"></td>
          </tr>

          <!-- Header Block -->
          <tr>
            <td style="padding: 40px 30px 20px 30px; text-align: center;">
              <!-- Cartoon Avatar Logo -->
              <img src="https://raw.githubusercontent.com/allie-pasag/aap-ht-qualifier/main/public/allie_cartoon_excited.png" alt="Allie Pasag" width="120" style="display: block; margin: 0 auto 20px auto; border-radius: 50%; border: 2px solid #E040FB;">
              <span style="display: block; font-size: 10px; text-transform: uppercase; letter-spacing: 0.25em; color: #E040FB; font-weight: 600; margin-bottom: 10px;">
                Your Readiness Report — ${firstName.toUpperCase()}
              </span>
              <h1 style="color: #ffffff; font-size: 26px; font-weight: 600; margin: 0; line-height: 1.3;">
                ${result.headline}
              </h1>
            </td>
          </tr>

          <!-- Divider -->
          <tr>
            <td style="padding: 0 30px;">
              <div style="height: 1px; background-color: #222222;"></div>
            </td>
          </tr>

          <!-- Narrative Summary -->
          <tr>
            <td style="padding: 30px 30px 20px 30px;">
              <span style="display: block; font-size: 9px; text-transform: uppercase; letter-spacing: 0.15em; color: #666666; font-weight: 500; margin-bottom: 8px;">
                Situation Summary
              </span>
              <p style="color: #888888; font-size: 14px; line-height: 1.6; margin: 0; font-weight: 300;">
                ${result.summary}
              </p>
            </td>
          </tr>

          <!-- Allie's Diagnosis Callout -->
          <tr>
            <td style="padding: 10px 30px;">
              <table border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #161616; border: 1px solid #E040FB; border-radius: 10px; border-spacing: 0;">
                <tr>
                  <td style="padding: 24px; position: relative;">
                    <div style="display: flex; align-items: center; margin-bottom: 10px;">
                      <span style="display: inline-block; width: 6px; height: 6px; border-radius: 50%; background-color: #E040FB; margin-right: 8px;"></span>
                      <span style="font-size: 9px; text-transform: uppercase; letter-spacing: 0.15em; color: #E040FB; font-weight: 600;">
                        Allie's Diagnosis
                      </span>
                    </div>
                    <p style="color: #ffffff; font-size: 14px; line-height: 1.6; margin: 0; font-style: italic; font-weight: 300;">
                      &ldquo;${result.diagnosis}&rdquo;
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Structural Parameters (2x2 Table Layout for clean compatibility) -->
          <tr>
            <td style="padding: 25px 30px 20px 30px;">
              <span style="display: block; font-size: 9px; text-transform: uppercase; letter-spacing: 0.15em; color: #666666; font-weight: 500; margin-bottom: 12px;">
                Structural Parameters
              </span>
              <table border="0" cellpadding="0" cellspacing="10" width="100%" style="margin: -10px; border-spacing: 10px;">
                <tr>
                  <td width="50%" style="background-color: #111111; border: 1px solid #222222; padding: 16px; border-radius: 6px; vertical-align: top;">
                    <span style="display: block; font-size: 9px; text-transform: uppercase; letter-spacing: 0.1em; color: #444444; font-weight: 600; margin-bottom: 4px;">Offer Status</span>
                    <span style="font-size: 13px; font-weight: bold; color: #ffffff;">${result.status_tiles.offer_status}</span>
                  </td>
                  <td width="50%" style="background-color: #111111; border: 1px solid #222222; padding: 16px; border-radius: 6px; vertical-align: top;">
                    <span style="display: block; font-size: 9px; text-transform: uppercase; letter-spacing: 0.1em; color: #444444; font-weight: 600; margin-bottom: 4px;">Validation</span>
                    <span style="font-size: 13px; font-weight: bold; color: ${result.status_tiles.validation === 'Proven' ? '#22c55e' : '#ffffff'};">${result.status_tiles.validation}</span>
                  </td>
                </tr>
                <tr>
                  <td width="50%" style="background-color: #111111; border: 1px solid #222222; padding: 16px; border-radius: 6px; vertical-align: top;">
                    <span style="display: block; font-size: 9px; text-transform: uppercase; letter-spacing: 0.1em; color: #444444; font-weight: 600; margin-bottom: 4px;">Conversion Health</span>
                    <span style="font-size: 13px; font-weight: bold; color: ${result.status_tiles.conversion === 'Working' ? '#E040FB' : '#ffffff'};">${result.status_tiles.conversion}</span>
                  </td>
                  <td width="50%" style="background-color: #111111; border: 1px solid #222222; padding: 16px; border-radius: 6px; vertical-align: top;">
                    <span style="display: block; font-size: 9px; text-transform: uppercase; letter-spacing: 0.1em; color: #444444; font-weight: 600; margin-bottom: 4px;">Target Timeline</span>
                    <span style="font-size: 13px; font-weight: bold; color: #ffffff;">${result.status_tiles.timeline}</span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Price Anchor Block -->
          <tr>
            <td style="padding: 10px 30px 30px 30px;">
              <table border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #161616; border: 1px solid rgba(224, 64, 251, 0.2); border-radius: 8px; border-spacing: 0;">
                <tr>
                  <td style="padding: 20px;">
                    <span style="display: block; font-size: 9px; text-transform: uppercase; letter-spacing: 0.15em; color: #E040FB; font-weight: 600; margin-bottom: 6px;">
                      PRE-FRAMED INVESTMENT
                    </span>
                    <span style="font-size: 22px; font-weight: bold; color: #ffffff; display: block; margin-bottom: 8px;">
                      ${result.price_anchor}
                    </span>
                    <div style="height: 1px; background-color: #222222; margin: 10px 0;"></div>
                    <p style="color: #888888; font-size: 11px; line-height: 1.5; margin: 0; font-weight: 300;">
                      ${result.price_note || 'Investment thresholds reflect design, copywriting, and setup standards matching this segment.'}
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Booking Call to Action (Witty Pitch) -->
          <tr>
            <td style="padding: 15px 30px 40px 30px; text-align: center; background-color: #141414;">
              <h3 style="color: #ffffff; font-size: 18px; margin: 0 0 10px 0; font-weight: 500;">
                Let's map out your build roadmap!
              </h3>
              <p style="color: #888888; font-size: 13px; line-height: 1.5; margin: 0 0 24px 0; font-weight: 300;">
                If you haven't booked your 1-on-1 strategy call with me yet, let's grab a time! We will review this diagnostic report together and design your custom roadmap. No pitches, just pure strategy.
              </p>
              
              <!-- Clickable Booking Button -->
              <a href="${bookingUrl}" target="_blank" style="background-color: #E040FB; color: #000000; padding: 15px 32px; font-size: 14px; font-weight: 600; text-decoration: none; border-radius: 6px; display: inline-block; box-shadow: 0 4px 12px rgba(224, 64, 251, 0.3); transition: transform 0.2s;">
                Book My Strategy Call Now
              </a>

              <span style="display: block; font-size: 11px; color: #444444; margin-top: 16px; font-weight: 300;">
                Clicking will open my Book Like A Boss calendar in a new tab.
              </span>
            </td>
          </tr>

          <!-- Footer Footer -->
          <tr>
            <td style="padding: 30px; text-align: center; background-color: #0c0c0c;">
              <p style="color: #444444; font-size: 11px; margin: 0; font-weight: 300;">
                Sent with Care by Allie Pasag &copy; 2026. All Rights Reserved.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
    `;

    // Make network request to Resend
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: fromEmail,
        to: [email],
        subject: `✨ Your Custom Readiness Report — Compiled for ${firstName}`,
        html: htmlContent,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Failed to dispatch email via Resend API.');
    }

    return NextResponse.json({ success: true, data });
  } catch (error: any) {
    console.error("Resend API Exception:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
