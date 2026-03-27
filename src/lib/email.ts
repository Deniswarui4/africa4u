import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

interface InquiryEmailData {
  name: string;
  email: string;
  country?: string;
  budget?: string;
  interests?: string[];
  message?: string;
}

export async function sendInquiryNotification(data: InquiryEmailData) {
  try {
    await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL || "KenyanJustForYou <onboarding@resend.dev>",
      to: process.env.ADMIN_EMAIL || "admin@kenyanjustforyou.com",
      subject: `New Trip Inquiry from ${data.name}`,
      html: `
        <div style="font-family: 'Helvetica Neue', Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 40px 20px;">
          <div style="text-align: center; margin-bottom: 32px;">
            <h1 style="color: #214917; font-size: 24px; margin: 0;">KenyanJustForYou</h1>
            <p style="color: #666; font-size: 14px; margin-top: 4px;">New Trip Inquiry</p>
          </div>
          
          <div style="background: #f9f7f4; border-radius: 12px; padding: 24px; margin-bottom: 24px;">
            <h2 style="font-size: 18px; color: #333; margin: 0 0 16px 0;">Contact Details</h2>
            <p style="margin: 8px 0;"><strong>Name:</strong> ${data.name}</p>
            <p style="margin: 8px 0;"><strong>Email:</strong> <a href="mailto:${data.email}">${data.email}</a></p>
            ${data.country ? `<p style="margin: 8px 0;"><strong>Country:</strong> ${data.country}</p>` : ""}
          </div>
          
          <div style="background: #f9f7f4; border-radius: 12px; padding: 24px; margin-bottom: 24px;">
            <h2 style="font-size: 18px; color: #333; margin: 0 0 16px 0;">Trip Preferences</h2>
            ${data.budget ? `<p style="margin: 8px 0;"><strong>Budget:</strong> ${data.budget}</p>` : ""}
            ${data.interests?.length ? `<p style="margin: 8px 0;"><strong>Interests:</strong> ${data.interests.join(", ")}</p>` : ""}
          </div>
          
          ${data.message ? `
          <div style="background: #f9f7f4; border-radius: 12px; padding: 24px; margin-bottom: 24px;">
            <h2 style="font-size: 18px; color: #333; margin: 0 0 16px 0;">Additional Notes</h2>
            <p style="margin: 0; color: #555; line-height: 1.6;">${data.message}</p>
          </div>
          ` : ""}
          
          <div style="text-align: center; padding: 24px 0; border-top: 1px solid #eee;">
            <a href="${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/admin" 
               style="display: inline-block; background: #214917; color: white; padding: 12px 32px; border-radius: 8px; text-decoration: none; font-weight: 600;">
              View in Admin Panel
            </a>
          </div>
        </div>
      `,
    });
    return { success: true };
  } catch (error) {
    console.error("Failed to send email:", error);
    return { success: false, error };
  }
}

export async function sendInquiryConfirmation(data: InquiryEmailData) {
  try {
    await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL || "KenyanJustForYou <onboarding@resend.dev>",
      to: data.email,
      subject: "We've received your trip inquiry!",
      html: `
        <div style="font-family: 'Helvetica Neue', Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 40px 20px;">
          <div style="text-align: center; margin-bottom: 32px;">
            <h1 style="color: #214917; font-size: 28px; margin: 0;">KenyanJustForYou</h1>
          </div>
          
          <h2 style="font-size: 22px; color: #333; margin-bottom: 16px;">Thank you, ${data.name}!</h2>
          
          <p style="color: #555; font-size: 16px; line-height: 1.7;">
            We've received your trip inquiry and our team of local Kenyan travel experts is already reviewing your preferences. 
            You can expect a personalized itinerary proposal within <strong>24 hours</strong>.
          </p>
          
          <div style="background: #f9f7f4; border-radius: 12px; padding: 24px; margin: 24px 0;">
            <h3 style="font-size: 16px; color: #333; margin: 0 0 12px 0;">What happens next?</h3>
            <ol style="margin: 0; padding-left: 20px; color: #555; line-height: 2;">
              <li>Our experts review your preferences</li>
              <li>We craft a personalized day-by-day itinerary</li>
              <li>You receive your proposal via email for review</li>
              <li>We refine it together until it's perfect</li>
            </ol>
          </div>
          
          <p style="color: #555; font-size: 14px;">
            If you have any questions in the meantime, simply reply to this email.
          </p>
          
          <div style="text-align: center; padding: 24px 0; margin-top: 24px; border-top: 1px solid #eee; color: #999; font-size: 12px;">
            &copy; KenyanJustForYou — Personalized journeys designed just for you.
          </div>
        </div>
      `,
    });
    return { success: true };
  } catch (error) {
    console.error("Failed to send confirmation email:", error);
    return { success: false, error };
  }
}
