// Vercel Serverless Function: Schedule 15-Minute Walkthrough & Send Notification + Confirmation Emails
// Jackie Notification: jackie@primecleanba.com
// Customer Confirmation From: info@primecleanba.com

export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed. Use POST.' });
  }

  try {
    const data = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
    
    const {
      name,
      company,
      agency,
      email,
      phone,
      address,
      preferred_date,
      preferred_time,
      facility_type,
      sqft,
      solicitation,
      naics,
      message,
      form_type = 'commercial'
    } = data || {};

    if (!name || !email || !phone) {
      return res.status(400).json({ error: 'Name, email, and phone number are required.' });
    }

    const orgName = company || agency || 'N/A';
    const displayAddress = address || 'To be specified by client';
    const displayDate = preferred_date || 'Flexible / Next Available';
    const displayTime = preferred_time || 'Flexible';
    const displayType = facility_type || (form_type === 'government' ? 'Government / Public Sector' : 'Commercial Facility');
    const submissionDate = new Date().toLocaleString('en-US', { timeZone: 'America/Los_Angeles' }) + ' (PT)';

    // 1. Prepare Jackie's Notification Email
    const jackieEmailHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; line-height: 1.5; color: #1e293b; margin: 0; padding: 20px; background: #f1f5f9; }
          .container { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 12px; overflow: hidden; border: 1px solid #e2e8f0; box-shadow: 0 4px 12px rgba(0,0,0,0.05); }
          .header { background: #0a2f47; color: #ffffff; padding: 24px; text-align: left; }
          .header h1 { margin: 0 0 6px; font-size: 20px; color: #f5b754; }
          .header p { margin: 0; font-size: 14px; color: #cbd5e1; }
          .content { padding: 24px; }
          .highlight-card { background: #f8fafc; border-left: 4px solid #f5b754; padding: 16px; border-radius: 6px; margin-bottom: 20px; }
          .highlight-title { font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; color: #64748b; margin-bottom: 8px; }
          .highlight-val { font-size: 16px; font-weight: 700; color: #0a2f47; }
          .detail-table { width: 100%; border-collapse: collapse; margin-top: 12px; }
          .detail-table td { padding: 10px 12px; border-bottom: 1px solid #f1f5f9; font-size: 14px; }
          .detail-table td.label { font-weight: 600; color: #475569; width: 38%; }
          .detail-table td.value { color: #0f172a; }
          .notes-box { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 14px; margin-top: 16px; font-size: 14px; color: #334155; }
          .footer { padding: 16px 24px; background: #f8fafc; border-top: 1px solid #e2e8f0; font-size: 12px; color: #94a3b8; text-align: center; }
          .btn { display: inline-block; background: #f5b754; color: #0a2f47; padding: 10px 20px; border-radius: 6px; font-weight: 700; text-decoration: none; margin-top: 14px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🗓️ New 15-Minute Walkthrough Request</h1>
            <p>A new prospect has requested an on-site walkthrough via PrimeClean website.</p>
          </div>
          <div class="content">
            <div class="highlight-card">
              <div class="highlight-title">Requested Walkthrough Time (15 Min)</div>
              <div class="highlight-val">📅 ${displayDate} &nbsp;·&nbsp; ⏰ ${displayTime}</div>
              <div style="margin-top: 6px; font-size: 14px; color: #475569;">📍 <strong>Location:</strong> ${displayAddress}</div>
            </div>

            <h3 style="margin: 20px 0 10px; font-size: 16px; color: #0a2f47;">Prospect Details</h3>
            <table class="detail-table">
              <tr>
                <td class="label">Full Name:</td>
                <td class="value"><strong>${name}</strong></td>
              </tr>
              <tr>
                <td class="label">Company / Agency:</td>
                <td class="value">${orgName}</td>
              </tr>
              <tr>
                <td class="label">Email:</td>
                <td class="value"><a href="mailto:${email}" style="color:#0284c7;">${email}</a></td>
              </tr>
              <tr>
                <td class="label">Phone:</td>
                <td class="value"><a href="tel:${phone.replace(/[^0-9+]/g, '')}" style="color:#0284c7;">${phone}</a></td>
              </tr>
              <tr>
                <td class="label">Facility Address:</td>
                <td class="value"><strong>${displayAddress}</strong></td>
              </tr>
              <tr>
                <td class="label">Facility Type:</td>
                <td class="value">${displayType}</td>
              </tr>
              ${sqft ? `<tr><td class="label">Approx. Sq Ft:</td><td class="value">${sqft}</td></tr>` : ''}
              ${solicitation ? `<tr><td class="label">Solicitation / RFP:</td><td class="value">${solicitation}</td></tr>` : ''}
              ${naics ? `<tr><td class="label">NAICS Code:</td><td class="value">${naics}</td></tr>` : ''}
              <tr>
                <td class="label">Submitted:</td>
                <td class="value">${submissionDate}</td>
              </tr>
            </table>

            ${message ? `
              <h3 style="margin: 20px 0 8px; font-size: 15px; color: #0a2f47;">Notes & Special Scope:</h3>
              <div class="notes-box">${message.replace(/\n/g, '<br>')}</div>
            ` : ''}

            <div style="margin-top: 24px; text-align: center;">
              <a href="mailto:${email}?subject=Confirming%20Your%20Prime%20Clean%20Walkthrough%20on%20${encodeURIComponent(displayDate)}" class="btn">Reply to ${name}</a>
              &nbsp;&nbsp;
              <a href="tel:${phone.replace(/[^0-9+]/g, '')}" class="btn" style="background:#0a2f47; color:#ffffff;">Call ${phone}</a>
            </div>
          </div>
          <div class="footer">
            Prime Clean Notification System · Form: ${form_type.toUpperCase()}
          </div>
        </div>
      </body>
      </html>
    `;

    // 2. Prepare Customer / Prospect Confirmation Email
    const customerEmailHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; line-height: 1.6; color: #1e293b; margin: 0; padding: 20px; background: #f8fafc; }
          .container { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 12px; overflow: hidden; border: 1px solid #e2e8f0; box-shadow: 0 4px 12px rgba(0,0,0,0.06); }
          .header { background: #0a2f47; color: #ffffff; padding: 32px 28px; text-align: center; }
          .badge { display: inline-block; background: rgba(245, 183, 84, 0.2); color: #f5b754; font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; padding: 4px 12px; border-radius: 999px; margin-bottom: 12px; }
          .header h1 { margin: 0 0 8px; font-size: 22px; font-weight: 800; color: #ffffff; }
          .header p { margin: 0; font-size: 14px; color: #cbd5e1; }
          .content { padding: 32px 28px; }
          .greeting { font-size: 17px; font-weight: 700; color: #0a2f47; margin-bottom: 14px; }
          .highlight-banner { background: #e0f2fe; border-left: 4px solid #0284c7; padding: 16px; border-radius: 6px; margin: 18px 0; font-size: 14.5px; color: #0369a1; }
          .booking-card { background: #f0f7fb; border: 1.5px solid #b8daed; border-radius: 10px; padding: 20px; margin: 20px 0; }
          .booking-header { font-size: 13px; font-weight: 700; color: #0369a1; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 12px; }
          .steps-box { background: #ffffff; border: 1px solid #e2e8f0; border-radius: 8px; padding: 18px; margin: 20px 0; }
          .step-item { display: flex; gap: 12px; margin-bottom: 12px; }
          .step-item:last-child { margin-bottom: 0; }
          .step-num { width: 24px; height: 24px; border-radius: 50%; background: #0a2f47; color: #f5b754; font-weight: 800; font-size: 12px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; margin-top: 2px; }
          .step-text { font-size: 13.5px; color: #334155; }
          .contact-bar { background: #0a2f47; color: #ffffff; border-radius: 8px; padding: 18px; text-align: center; margin-top: 24px; }
          .contact-bar h4 { margin: 0 0 6px; color: #f5b754; font-size: 15px; }
          .contact-bar p { margin: 0; font-size: 13px; color: #cbd5e1; }
          .contact-bar a { color: #ffffff; font-weight: 700; text-decoration: none; }
          .footer { padding: 20px; background: #f8fafc; border-top: 1px solid #e2e8f0; font-size: 12px; color: #64748b; text-align: center; }
          .footer p { margin: 4px 0; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <div class="badge">Prime Clean · Commercial &amp; Government Janitorial</div>
            <h1>We Received Your Request!</h1>
            <p>Thank you for contacting Prime Clean.</p>
          </div>
          <div class="content">
            <div class="greeting">Hello ${name},</div>
            <p>Thank you for reaching out to Prime Clean. We have received your request regarding <strong>${orgName}</strong>.</p>

            <div class="highlight-banner">
              ⏱️ <strong>Next Step:</strong> One of our Prime Clean associates will review your inquiry and reach out to you within the next <strong>1 to 24 hours</strong> to discuss your scope and confirm your details.
            </div>

            <div class="booking-card">
              <div class="booking-header">📍 Summary of Your Request</div>
              <div style="font-size:14px; margin-bottom:8px;"><strong>Facility / Company:</strong> ${orgName} (${displayType})</div>
              <div style="font-size:14px; margin-bottom:8px;"><strong>Facility Address:</strong> ${displayAddress}</div>
              <div style="font-size:14px; margin-bottom:8px;"><strong>Preferred Walkthrough Date:</strong> ${displayDate}</div>
              <div style="font-size:14px; margin-bottom:8px;"><strong>Preferred Time Slot:</strong> ${displayTime} (15 Min Walkthrough)</div>
              ${sqft ? `<div style="font-size:14px; margin-bottom:8px;"><strong>Approximate Size:</strong> ${sqft}</div>` : ''}
              ${message ? `<div style="font-size:14px; margin-top:8px; padding-top:8px; border-top:1px dashed #cbd5e1;"><strong>Your Notes:</strong> <em>${message}</em></div>` : ''}
            </div>

            <h3 style="font-size: 16px; color: #0a2f47; margin: 24px 0 12px;">What happens next:</h3>
            <div class="steps-box">
              <div class="step-item">
                <div class="step-num">1</div>
                <div class="step-text"><strong>Rapid Review:</strong> Our operations dispatch team reviews your facility location and requirements.</div>
              </div>
              <div class="step-item">
                <div class="step-num">2</div>
                <div class="step-text"><strong>Direct Contact (1–24 Hours):</strong> An associate calls or emails you directly to confirm your 15-minute on-site visit or customized scope.</div>
              </div>
              <div class="step-item">
                <div class="step-num">3</div>
                <div class="step-text"><strong>Cleanliness &amp; Compliance Score:</strong> Following our visit, you receive a free written evaluation with itemized pricing options.</div>
              </div>
            </div>

            <div class="contact-bar">
              <h4>Need Immediate Assistance or Have Urgent Questions?</h4>
              <p>Direct Office: <a href="tel:14155728733">(415) 572-8733</a> &nbsp;·&nbsp; Email: <a href="mailto:info@primecleanba.com">info@primecleanba.com</a></p>
            </div>
          </div>
          <div class="footer">
            <p><strong>Prime Clean</strong> · 353 S 24th St, Richmond, CA 94804</p>
            <p>Women-Owned Small Business (WOSB) · CA Small Business Certified (#2048444) · Licensed, Bonded &amp; Insured</p>
            <p style="margin-top: 10px; color: #94a3b8; font-size: 11px;">Serving Contra Costa County, Alameda County &amp; San Francisco</p>
          </div>
        </div>
      </body>
      </html>
    `;

    // 3. Email Dispatcher Logic
    const recipients = ['jackie@primecleanba.com', 'iamvazu@gmail.com'];
    const senderFrom = process.env.RESEND_FROM || 'Prime Clean <info@primecleanba.com>';
    const resendApiKey = process.env.RESEND_API_KEY;
    const sendgridApiKey = process.env.SENDGRID_API_KEY;
    let emailSentToAdmins = false;
    let emailSentToCustomer = false;

    if (resendApiKey) {
      // Send using Resend
      const adminRes = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${resendApiKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          from: senderFrom,
          to: recipients,
          reply_to: email,
          subject: `🗓️ New 15-Min Walkthrough / Lead Request: ${name} (${orgName})`,
          html: jackieEmailHtml
        })
      });

      if (adminRes.ok) emailSentToAdmins = true;

      // Send Confirmation to Prospect
      const customerRes = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${resendApiKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          from: senderFrom,
          to: [email],
          reply_to: 'info@primecleanba.com',
          subject: `Request Received: Prime Clean Commercial Cleaning & Walkthrough for ${name}`,
          html: customerEmailHtml
        })
      });

      if (customerRes.ok) emailSentToCustomer = true;
    } else if (sendgridApiKey) {
      // Send using SendGrid
      const sendgridFrom = process.env.SENDGRID_FROM || 'info@primecleanba.com';

      await fetch('https://api.sendgrid.com/v3/mail/send', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${sendgridApiKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          personalizations: [{ to: recipients.map(r => ({ email: r })) }],
          from: { email: sendgridFrom, name: 'Prime Clean' },
          reply_to: { email: email, name: name },
          subject: `🗓️ New 15-Min Walkthrough / Lead Request: ${name} (${orgName})`,
          content: [{ type: 'text/html', value: jackieEmailHtml }]
        })
      });

      await fetch('https://api.sendgrid.com/v3/mail/send', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${sendgridApiKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          personalizations: [{ to: [{ email: email, name: name }] }],
          from: { email: sendgridFrom, name: 'Prime Clean' },
          reply_to: { email: 'info@primecleanba.com', name: 'Prime Clean Operations' },
          subject: `Request Received: Prime Clean Commercial Cleaning & Walkthrough for ${name}`,
          content: [{ type: 'text/html', value: customerEmailHtml }]
        })
      });
      emailSentToAdmins = true;
      emailSentToCustomer = true;
    } else {
      // Development / Local / Simulated logging mode
      console.log('--- [WALKTHROUGH / CONTACT FORM SUBMISSION] ---');
      console.log('Admin Recipients:', recipients);
      console.log('Customer Recipient:', email);
      console.log('From Address:', senderFrom);
      console.log('Booking Data:', {
        name,
        company: orgName,
        email,
        phone,
        address: displayAddress,
        preferred_date: displayDate,
        preferred_time: displayTime,
        facility_type: displayType,
        sqft,
        message
      });
      console.log('NOTE: To deliver live emails, set RESEND_API_KEY (or SENDGRID_API_KEY) in Vercel Environment Variables.');
      emailSentToAdmins = true;
      emailSentToCustomer = true;
    }

    return res.status(200).json({
      success: true,
      message: 'Walkthrough request received and confirmed!',
      booking: {
        name,
        company: orgName,
        email,
        phone,
        address: displayAddress,
        preferred_date: displayDate,
        preferred_time: displayTime,
        facility_type: displayType
      }
    });

  } catch (error) {
    console.error('Error processing walkthrough request:', error);
    return res.status(500).json({ error: 'Server error processing walkthrough request. Please try again or call (415) 572-8733.' });
  }
}
