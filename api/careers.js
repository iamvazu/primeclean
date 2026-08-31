// Vercel Serverless Function: Job Application & Resume Submission
// Jackie Notification Destination: jackie@primecleanba.com
// Candidate Confirmation Sender: info@primecleanba.com

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '10mb'
    }
  }
};

export default async function handler(req, res) {
  // CORS Headers
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
      email,
      phone,
      city,
      position,
      availability,
      experience,
      work_auth,
      message,
      resume_filename,
      resume_data, // Base64 string
      resume_type
    } = data || {};

    if (!name || !email || !phone || !position) {
      return res.status(400).json({ error: 'Name, email, phone, and position applied for are required.' });
    }

    const submissionDate = new Date().toLocaleString('en-US', { timeZone: 'America/Los_Angeles' }) + ' (PT)';
    const candidateCity = city || 'East Bay / SF Bay Area';
    const candidateExp = experience || 'Not specified';
    const candidateAvail = availability || 'Flexible';
    const candidateAuth = work_auth ? 'Yes (Authorized to work in US)' : 'Not specified';
    const resumeStatus = resume_data ? `Attached: ${resume_filename || 'Candidate_Resume'}` : 'No resume file attached (see notes below)';

    // 1. Jackie's Notification Email HTML
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
          .highlight-title { font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; color: #64748b; margin-bottom: 4px; }
          .highlight-val { font-size: 18px; font-weight: 800; color: #0a2f47; }
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
            <h1>💼 New Job Application Received</h1>
            <p>A new candidate has applied for an open position at Prime Clean.</p>
          </div>
          <div class="content">
            <div class="highlight-card">
              <div class="highlight-title">Position Applied For</div>
              <div class="highlight-val">${position}</div>
              <div style="margin-top: 6px; font-size: 14px; color: #475569;">📍 <strong>Candidate Location:</strong> ${candidateCity}</div>
            </div>

            <h3 style="margin: 20px 0 10px; font-size: 16px; color: #0a2f47;">Candidate Information</h3>
            <table class="detail-table">
              <tr>
                <td class="label">Full Name:</td>
                <td class="value"><strong>${name}</strong></td>
              </tr>
              <tr>
                <td class="label">Email:</td>
                <td class="value"><a href="mailto:${email}" style="color:#0071a8; font-weight:600;">${email}</a></td>
              </tr>
              <tr>
                <td class="label">Phone:</td>
                <td class="value"><a href="tel:${phone}" style="color:#0071a8; font-weight:600;">${phone}</a></td>
              </tr>
              <tr>
                <td class="label">Shift Availability:</td>
                <td class="value">${candidateAvail}</td>
              </tr>
              <tr>
                <td class="label">Commercial Experience:</td>
                <td class="value">${candidateExp}</td>
              </tr>
              <tr>
                <td class="label">Work Authorized (US):</td>
                <td class="value">${candidateAuth}</td>
              </tr>
              <tr>
                <td class="label">Resume File:</td>
                <td class="value"><strong>${resumeStatus}</strong></td>
              </tr>
            </table>

            ${message ? `
              <div style="margin-top: 20px;">
                <strong style="font-size: 14px; color: #0a2f47;">Candidate Notes / Statement:</strong>
                <div class="notes-box">${message.replace(/\n/g, '<br>')}</div>
              </div>
            ` : ''}

            <div style="text-align: center; margin-top: 24px;">
              <a href="tel:${phone}" class="btn">📞 Call Candidate (${phone})</a>
              &nbsp;
              <a href="mailto:${email}?subject=Prime Clean - Interview regarding ${encodeURIComponent(position)}" class="btn" style="background:#0a2f47; color:#fff;">✉️ Email Candidate</a>
            </div>
          </div>
          <div class="footer">
            Submitted via primecleanba.com/careers.html · ${submissionDate}
          </div>
        </div>
      </body>
      </html>
    `;

    // 2. Candidate Confirmation Email HTML
    const candidateEmailHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; line-height: 1.6; color: #1e293b; margin: 0; padding: 20px; background: #f1f5f9; }
          .container { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 12px; overflow: hidden; border: 1px solid #e2e8f0; box-shadow: 0 4px 12px rgba(0,0,0,0.05); }
          .header { background: #0a2f47; color: #ffffff; padding: 30px 24px; text-align: center; }
          .header h1 { margin: 0 0 8px; font-size: 22px; color: #f5b754; }
          .header p { margin: 0; font-size: 15px; color: #cbd5e1; }
          .content { padding: 30px 24px; }
          .highlight-card { background: #eef7fb; border: 1px solid #d7edf5; padding: 18px; border-radius: 8px; margin: 20px 0; }
          .highlight-title { font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; color: #0071a8; margin-bottom: 6px; }
          .highlight-val { font-size: 17px; font-weight: 800; color: #0a2f47; }
          .steps-box { background: #f8fafc; border-radius: 8px; padding: 18px; margin: 20px 0; border: 1px solid #e2e8f0; }
          .step-item { display: flex; margin-bottom: 12px; }
          .step-num { width: 24px; height: 24px; border-radius: 50%; background: #f5b754; color: #0a2f47; font-weight: 800; font-size: 12px; display: inline-flex; align-items: center; justify-content: center; margin-right: 12px; flex-shrink: 0; margin-top: 2px; }
          .footer { padding: 20px 24px; background: #f8fafc; border-top: 1px solid #e2e8f0; font-size: 13px; color: #64748b; text-align: center; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Application Received — Prime Clean</h1>
            <p>Thank you for your interest in joining our commercial cleaning team!</p>
          </div>
          <div class="content">
            <p>Hi <strong>${name}</strong>,</p>
            <p>We have successfully received your application and resume for the <strong>${position}</strong> position at Prime Clean.</p>
            
            <div class="highlight-card">
              <div class="highlight-title">Application Summary</div>
              <div class="highlight-val">${position}</div>
              <div style="margin-top: 6px; font-size: 14px; color: #475569;">
                📍 <strong>Location:</strong> ${candidateCity}<br>
                ⏱️ <strong>Shift Availability:</strong> ${candidateAvail}
              </div>
            </div>

            <h3 style="color:#0a2f47; margin-top:24px;">What Happens Next?</h3>
            <div class="steps-box">
              <div class="step-item">
                <div class="step-num">1</div>
                <div><strong>Resume Review:</strong> Our operations management team reviews all incoming applications against current route needs in your area.</div>
              </div>
              <div class="step-item">
                <div class="step-num">2</div>
                <div><strong>Phone Screening:</strong> If your availability matches an open schedule, we will call you directly to discuss hours, wage, and route locations.</div>
              </div>
              <div class="step-item" style="margin-bottom:0;">
                <div class="step-num">3</div>
                <div><strong>On-Site Walkthrough &amp; Paid Training:</strong> You will meet your supervisor on site and receive full training on equipment and safety protocols.</div>
              </div>
            </div>

            <p style="font-size: 14px; color: #475569; margin-top: 20px;">
              If you have any questions or need to update your availability, you can reply directly to this email at <a href="mailto:info@primecleanba.com" style="color:#0071a8; font-weight:600;">info@primecleanba.com</a> or call our office at <strong>(415) 572-8733</strong>.
            </p>
          </div>
          <div class="footer">
            <strong>Prime Clean</strong> · Richmond, CA · Serving the East Bay &amp; San Francisco<br>
            Women-Owned, California Small Business Certified (CA SB #2048444)
          </div>
        </div>
      </body>
      </html>
    `;

    // 3. Attempt Email Delivery via Resend / SendGrid if Configured
    let emailSent = false;
    const resendApiKey = process.env.RESEND_API_KEY;
    const sendgridApiKey = process.env.SENDGRID_API_KEY;

    if (resendApiKey) {
      try {
        const attachments = resume_data ? [{
          filename: resume_filename || 'Candidate_Resume.pdf',
          content: resume_data
        }] : [];

        // Send to Jackie
        await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${resendApiKey}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            from: 'Prime Clean Dispatch <info@primecleanba.com>',
            to: ['jackie@primecleanba.com'],
            subject: `💼 New Job Application: ${name} (${position})`,
            html: jackieEmailHtml,
            attachments
          })
        });

        // Send confirmation to Candidate
        await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${resendApiKey}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            from: 'Prime Clean Careers <info@primecleanba.com>',
            to: [email],
            subject: `We've received your application for ${position} — Prime Clean`,
            html: candidateEmailHtml
          })
        });

        emailSent = true;
      } catch (e) {
        console.warn('Resend API call error:', e.message);
      }
    } else if (sendgridApiKey) {
      try {
        const attachments = resume_data ? [{
          content: resume_data,
          filename: resume_filename || 'Candidate_Resume.pdf',
          type: resume_type || 'application/pdf',
          disposition: 'attachment'
        }] : [];

        await fetch('https://api.sendgrid.com/v3/mail/send', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${sendgridApiKey}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            personalizations: [
              { to: [{ email: 'jackie@primecleanba.com' }] }
            ],
            from: { email: 'info@primecleanba.com', name: 'Prime Clean Dispatch' },
            subject: `💼 New Job Application: ${name} (${position})`,
            content: [{ type: 'text/html', value: jackieEmailHtml }],
            attachments
          })
        });

        await fetch('https://api.sendgrid.com/v3/mail/send', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${sendgridApiKey}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            personalizations: [
              { to: [{ email }] }
            ],
            from: { email: 'info@primecleanba.com', name: 'Prime Clean Careers' },
            subject: `We've received your application for ${position} — Prime Clean`,
            content: [{ type: 'text/html', value: candidateEmailHtml }]
          })
        });

        emailSent = true;
      } catch (e) {
        console.warn('SendGrid API call error:', e.message);
      }
    }

    return res.status(200).json({
      success: true,
      message: 'Application and resume successfully submitted.',
      emailSent,
      candidate: {
        name,
        email,
        position,
        city: candidateCity
      }
    });

  } catch (err) {
    console.error('Careers handler error:', err);
    return res.status(500).json({ error: 'Internal server error processing application.' });
  }
}
