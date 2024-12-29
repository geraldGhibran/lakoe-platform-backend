import { text } from 'stream/consumers';
import { InvoicesDto } from '../dto/invoices-dto';
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: 'sandbox.smtp.mailtrap.io',
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.APP_PASSWORD,
  },
});

export const sendEmail = async (
  email: string,
  invoice: any,
  productName: string,
  link?: string,
) => {
  const mailOptions = {
    from: `"Lakoe App admin"`,
    to: email || 'R4YXw@example.com',
    subject: 'information about your invoice',
    html: `<!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
</head>
<body style="display: flex; justify-content: center;">
  
  <div>
    <h1>[Pesanan Berhasil Dibayarkan]</h1>
    <p>Terima kasih! Pesananmu telah berhasil dibayarkan dan siap kami proses</p>
    <p>Untuk melihat detail pesananmu, silahkan lihat di bawah berikut :</p>
    <div style="display: flex; flex-direction: column; border: 1px solid black;">
      <ul>
        <li>
          No invoice : ${invoice.invoice_id}
        </li>
        <li>
          nama pembeli: ${invoice.receiver_name}
        </li>
        <li>
          nama produk: ${productName}
        </li>
        <li>
          total harga ${invoice.total_amount}
        </li>
      </ul>
    </div>
    <p>jika ingin melihat proses produk anda, silahkan klik tombol ini: </p>
    <button style="padding: 10px; border: transparent; background-color: aqua;  font-weight: bold; border-radius: 5px; " ><a href="${link}" style="text-decoration: none; color: white;">
      Link track
    </a></button>
  </div>
</body>`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Email sent successfully');
    return true;
  } catch (error) {
    console.error('Error sending email:', error);
    return false;
  }
};

export const sendPaymentMail = async (
  email: string,
  name: string,
  inoviceNumber: string,
  jumlah: number,
  link: string,
) => {
  const mailOptions = {
    from: `"Lakoe App"`,
    to: email,
    subject: 'Link Payment',
    html: `<!DOCTYPE html>
<html>
<head>

  <meta charset="utf-8">
  <meta http-equiv="x-ua-compatible" content="ie=edge">
  <title>Email Template Base</title>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <style type="text/css">
  /**
   * Google webfonts. Recommended to include the .woff version for cross-client compatibility.
   */
  @media screen {
    @font-face {
      font-family: 'Source Sans Pro';
      font-style: normal;
      font-weight: 400;
      src: local('Source Sans Pro Regular'), local('SourceSansPro-Regular'), url(https://fonts.gstatic.com/s/sourcesanspro/v10/ODelI1aHBYDBqgeIAH2zlBM0YzuT7MdOe03otPbuUS0.woff) format('woff');
    }

    @font-face {
      font-family: 'Source Sans Pro';
      font-style: normal;
      font-weight: 700;
      src: local('Source Sans Pro Bold'), local('SourceSansPro-Bold'), url(https://fonts.gstatic.com/s/sourcesanspro/v10/toadOcfmlt9b38dHJxOBGFkQc6VGVFSmCnC_l7QZG60.woff) format('woff');
    }
  }

  /**
   * Avoid browser level font resizing.
   * 1. Windows Mobile
   * 2. iOS / OSX
   */
  body,
  table,
  td,
  a {
    -ms-text-size-adjust: 100%; /* 1 */
    -webkit-text-size-adjust: 100%; /* 2 */
  }

  /**
   * Remove extra space added to tables and cells in Outlook.
   */
  table,
  td {
    mso-table-rspace: 0pt;
    mso-table-lspace: 0pt;
  }

  /**
   * Better fluid images in Internet Explorer.
   */
  img {
    -ms-interpolation-mode: bicubic;
  }

  /**
   * Remove blue links for iOS devices.
   */
  a[x-apple-data-detectors] {
    font-family: inherit !important;
    font-size: inherit !important;
    font-weight: inherit !important;
    line-height: inherit !important;
    color: inherit !important;
    text-decoration: none !important;
  }

  /**
   * Fix centering issues in Android 4.4.
   */
  div[style*="margin: 16px 0;"] {
    margin: 0 !important;
  }

  body {
    width: 100% !important;
    height: 100% !important;
    padding: 0 !important;
    margin: 0 !important;
  }

  /**
   * Collapse table borders to avoid space between cells.
   */
  table {
    border-collapse: collapse !important;
  }

  a {
    color: #1a82e2;
  }

  img {
    height: auto;
    line-height: 100%;
    text-decoration: none;
    border: 0;
    outline: none;
  }
  </style>

</head>
<body style="background-color: #e9ecef;">

  <!-- start preheader -->
  <div class="preheader" style="display: none; max-width: 0; max-height: 0; overflow: hidden; font-size: 1px; line-height: 1px; color: #fff; opacity: 0;">
    A preheader is the short summary text that follows the subject line when an email is viewed in the inbox.
  </div>
  <!-- end preheader -->

  <!-- start body -->
  <table border="0" cellpadding="0" cellspacing="0" width="100%">

    <!-- start hero -->
    <tr>
      <td align="center" bgcolor="#e9ecef">
        <!--[if (gte mso 9)|(IE)]>
        <table align="center" border="0" cellpadding="0" cellspacing="0" width="600">
        <tr>
        <td align="center" valign="top" width="600">
        <![endif]-->
        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
          <tr>
            <td align="left" bgcolor="#ffffff" style="padding: 36px 24px 0; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; border-top: 3px solid #d4dadf;">
              <h1 style="margin: 0; font-size: 32px; font-weight: 700; letter-spacing: -1px; line-height: 48px;">[Permintaan Pembayaran]</h1>
              <h3>Hai, ${name}!</h3>
            </td>
          </tr>
        </table>
        <!--[if (gte mso 9)|(IE)]>
        </td>
        </tr>
        </table>
        <![endif]-->
      </td>
    </tr>
    <!-- end hero -->

    <!-- start copy block -->
    <tr>
      <td align="center" bgcolor="#e9ecef">
        <!--[if (gte mso 9)|(IE)]>
        <table align="center" border="0" cellpadding="0" cellspacing="0" width="600">
        <tr>
        <td align="center" valign="top" width="600">
        <![endif]-->
        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">

          <!-- start copy -->
          <tr>
            <td align="left" bgcolor="#ffffff" style="padding: 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; line-height: 24px;">
              <p style="margin: 0;">Terima kasih telah melakukan pemesanan di Lakoe-platform. Berikut adalah detail tagihan Anda:</p>
              <ul>
                <li>
                  Nomor Pesanan: ${inoviceNumber}
                </li>
                <li>
                  Total Pembayaran: Rp ${jumlah}
                </li>
              </ul>
            </td>
          </tr>
          <!-- end copy -->

          <!-- start button -->
          <tr>
            <td align="left" bgcolor="#ffffff">
              <table border="0" cellpadding="0" cellspacing="0" width="100%">
                <tr>
                  <td align="center" bgcolor="#ffffff" style="padding: 12px;">
                    <table border="0" cellpadding="0" cellspacing="0">
                      <tr>
                        <td align="center" style="border-radius: 6px;">
                          <p style="display: inline-block; padding: 16px 36px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; color: black; text-decoration: none; border-radius: 6px;">
                            jika ingin melakukan pembayaran, harap klik tombol dibawah ini :
                          </p>
                        </td>
                      </tr>
                      <tr>
                       
                        <td align="center" bgcolor="#1a82e2" style="border-radius: 6px;">
                          <a href="${link}" target="_blank" style="display: inline-block; padding: 16px 36px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; color: #ffffff; text-decoration: none; border-radius: 6px;">Klik Link ini</a>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <!-- end button -->



        </table>
        <!--[if (gte mso 9)|(IE)]>
        </td>
        </tr>
        </table>
        <![endif]-->
      </td>
    </tr>
    <!-- end copy block -->

    <!-- start footer -->
    <tr>
      <td align="center" bgcolor="#e9ecef" style="padding: 24px;">
        <!--[if (gte mso 9)|(IE)]>
        <table align="center" border="0" cellpadding="0" cellspacing="0" width="600">
        <tr>
        <td align="center" valign="top" width="600">
        <![endif]-->
        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">

          <!-- start permission -->
          <tr>
            <td align="center" bgcolor="#e9ecef" style="padding: 12px 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 14px; line-height: 20px; color: #666;">
              <p style="margin: 0;">You received this email because we received a request for [type_of_action] for your account. If you didn't request [type_of_action] you can safely delete this email.</p>
            </td>
          </tr>
          <!-- end permission -->

          <!-- start unsubscribe -->
          <tr>
            <td align="center" bgcolor="#e9ecef" style="padding: 12px 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 14px; line-height: 20px; color: #666;">
              <p style="margin: 0;">To stop receiving these emails, you can <a href="https://sendgrid.com" target="_blank">unsubscribe</a> at any time.</p>
              <p style="margin: 0;">Paste 1234 S. Broadway St. City, State 12345</p>
            </td>
          </tr>
          <!-- end unsubscribe -->

        </table>
        <!--[if (gte mso 9)|(IE)]>
        </td>
        </tr>
        </table>
        <![endif]-->
      </td>
    </tr>
    <!-- end footer -->

  </table>
  <!-- end body -->

</body>
</html>`,
  };
  try {
    await transporter.sendMail(mailOptions);
    return true;
  } catch (error) {
    console.error('Error sending email:', error);
    return false;
  }
};

export const sendResetPasswordEmail = async (
  email: string,
  token: string,
  name: string,
) => {
  const resetLink = `http://localhost:5173/reset-password/${token}`;

  const mailOptions = {
    from: `"Lakoe App" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: 'Reset Password Link',
    html: `
            <!DOCTYPE html>
            <html>
              <head>
                  <meta charset="UTF-8">
                  <meta name="viewport" content="width=device-width, initial-scale=1.0">
              </head>
              <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; line-height: 1.6; background-color: #f7fafc;">
                  <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
                      <div style="text-align: center; padding: 20px 0;">
                          <h1 style="color: #2d3748; margin: 0;">Reset Your Password</h1>
                      </div>
                      
                      <div style="background-color: #ffffff; padding: 30px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);">
                          <p style="color: #4a5568;">Hi ${name},</p>
                          
                          <p style="color: #4a5568;">We received a request to reset the password for your Haloa App account. Click the button below to proceed:</p>
                          
                          <div style="text-align: center; margin: 30px 0;">
                              <a href="${resetLink}" target="_blank" style="background-color: #4299e1; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; font-weight: bold; display: inline-block; transition: background-color 0.3s ease;">Reset Password</a>
                          </div>
                          
                          <p style="color: #718096; font-size: 14px;">This link will expire in 1 hour.</p>
                          
                          <p style="color: #718096; font-size: 14px;">If you didn't request a password reset, you can safely ignore this email.</p>
                          
                          <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 20px 0;">
                          
                          <div style="text-align: center;">
                              <p style="color: #4a5568; margin: 0;">Best regards,</p>
                              <p style="color: #2d3748; font-weight: bold; margin: 5px 0;">The Haloa App Team</p>
                          </div>
                      </div>
                      
                      <div style="text-align: center; margin-top: 20px;">
                          <p style="color: #a0aec0; font-size: 12px;">This is an automated email, please do not reply to this message.</p>
                      </div>
                  </div>
              </body>
              </html>
          `,
  };

  try {
    await transporter.sendMail(mailOptions);
    return true;
  } catch (error) {
    console.error('Error sending email:', error);
    return false;
  }
};
