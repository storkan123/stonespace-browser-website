// ============================================================
// Google Apps Script — Stonespace Browser Help Form
// ============================================================
// Deploy this as a Google Apps Script Web App:
//
// 1. Go to https://script.google.com and create a new project
// 2. Paste this code into the editor
// 3. Click Deploy > New deployment
// 4. Select "Web app" as the type
// 5. Set "Execute as" to your Google account
// 6. Set "Who has access" to "Anyone"
// 7. Click Deploy and copy the URL
// 8. Replace HELP_WEBHOOK in index.html with that URL
// ============================================================

function doGet(e) {
  var params = e.parameter;

  var ticketNumber = params.ticketNumber || 'Unknown';
  var name = params.name || 'Unknown';
  var email = params.email || 'Unknown';
  var category = params.category || 'General';
  var message = params.message || '(no message)';
  var timestamp = params.timestamp || new Date().toISOString();

  // Send email to support
  var subject = 'Stonespace support #' + ticketNumber;

  var body = 'New support request\n\n'
    + 'Ticket: ' + ticketNumber + '\n'
    + 'Name: ' + name + '\n'
    + 'Email: ' + email + '\n'
    + 'Category: ' + category + '\n'
    + 'Time: ' + timestamp + '\n\n'
    + 'Message:\n' + message;

  var htmlBody = '<div style="font-family: Arial, sans-serif; max-width: 600px;">'
    + '<h2 style="color: #1a1a1a;">Stonespace Support #' + ticketNumber + '</h2>'
    + '<table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">'
    + '<tr><td style="padding: 8px; font-weight: bold; color: #666; width: 100px;">Name</td><td style="padding: 8px;">' + name + '</td></tr>'
    + '<tr><td style="padding: 8px; font-weight: bold; color: #666;">Email</td><td style="padding: 8px;"><a href="mailto:' + email + '">' + email + '</a></td></tr>'
    + '<tr><td style="padding: 8px; font-weight: bold; color: #666;">Category</td><td style="padding: 8px;">' + category + '</td></tr>'
    + '<tr><td style="padding: 8px; font-weight: bold; color: #666;">Time</td><td style="padding: 8px;">' + timestamp + '</td></tr>'
    + '</table>'
    + '<div style="background: #f5f5f5; padding: 16px; border-radius: 8px;">'
    + '<p style="font-weight: bold; color: #666; margin: 0 0 8px;">Message</p>'
    + '<p style="margin: 0; white-space: pre-wrap;">' + message + '</p>'
    + '</div>'
    + '</div>';

  MailApp.sendEmail({
    to: 'storkan123@gmail.com',
    subject: subject,
    body: body,
    htmlBody: htmlBody,
    replyTo: email
  });

  return ContentService.createTextOutput(JSON.stringify({ status: 'ok', ticket: ticketNumber }))
    .setMimeType(ContentService.MimeType.JSON);
}
