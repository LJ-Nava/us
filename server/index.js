import express from 'express';
import cors from 'cors';
import nodemailer from 'nodemailer';
import multer from 'multer';

const app = express();
const PORT = 3001;

// Configure multer for file uploads (max 10MB)
const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 } // 10MB limit
});

// Middleware
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:5174', 'http://localhost:4173'],
  credentials: true
}));
app.use(express.json());

// Gmail transporter configuration
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'DeveloperLuis17@gmail.com',
    pass: 'nsvv yknf ptex svqu'
  }
});

// Verify transporter on startup
transporter.verify((error, success) => {
  if (error) {
    console.error('❌ Error connecting to Gmail:', error);
  } else {
    console.log('✅ Gmail server ready to send emails');
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Server is running' });
});

// Send email endpoint
app.post('/api/contact', upload.array('attachments', 5), async (req, res) => {
  try {
    const { name, email, company, phone, budget, service, message } = req.body;
    const files = req.files || [];

    // Validate required fields
    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        error: 'Nombre, email y mensaje son requeridos'
      });
    }

    // Prepare attachments
    const attachments = files.map(file => ({
      filename: file.originalname,
      content: file.buffer
    }));

    // Email content
    const mailOptions = {
      from: `"US Agency Contact" <DeveloperLuis17@gmail.com>`,
      to: 'DeveloperLuis17@gmail.com',
      replyTo: email,
      subject: `🚀 Nuevo contacto: ${name} ${company ? `- ${company}` : ''}`,
      html: `
        <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; background: #f8fafc; padding: 20px;">
          <div style="background: linear-gradient(135deg, #8b5cf6 0%, #06b6d4 100%); padding: 30px; border-radius: 16px 16px 0 0;">
            <h1 style="color: white; margin: 0; font-size: 24px;">Nuevo Mensaje de Contacto</h1>
            <p style="color: rgba(255,255,255,0.8); margin: 10px 0 0 0;">US Agency Web</p>
          </div>

          <div style="background: white; padding: 30px; border-radius: 0 0 16px 16px; box-shadow: 0 4px 20px rgba(0,0,0,0.1);">
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0;">
                  <strong style="color: #64748b;">Nombre:</strong>
                </td>
                <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0; color: #0f172a;">
                  ${name}
                </td>
              </tr>
              <tr>
                <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0;">
                  <strong style="color: #64748b;">Email:</strong>
                </td>
                <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0;">
                  <a href="mailto:${email}" style="color: #8b5cf6;">${email}</a>
                </td>
              </tr>
              ${company ? `
              <tr>
                <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0;">
                  <strong style="color: #64748b;">Empresa:</strong>
                </td>
                <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0; color: #0f172a;">
                  ${company}
                </td>
              </tr>
              ` : ''}
              ${phone ? `
              <tr>
                <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0;">
                  <strong style="color: #64748b;">Teléfono:</strong>
                </td>
                <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0; color: #0f172a;">
                  ${phone}
                </td>
              </tr>
              ` : ''}
              ${service ? `
              <tr>
                <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0;">
                  <strong style="color: #64748b;">Servicio:</strong>
                </td>
                <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0; color: #0f172a;">
                  ${service}
                </td>
              </tr>
              ` : ''}
              ${budget ? `
              <tr>
                <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0;">
                  <strong style="color: #64748b;">Presupuesto:</strong>
                </td>
                <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0; color: #0f172a;">
                  ${budget}
                </td>
              </tr>
              ` : ''}
            </table>

            <div style="margin-top: 24px; padding: 20px; background: #f8fafc; border-radius: 12px;">
              <strong style="color: #64748b; display: block; margin-bottom: 10px;">Mensaje:</strong>
              <p style="color: #0f172a; line-height: 1.6; margin: 0; white-space: pre-wrap;">${message}</p>
            </div>

            ${files.length > 0 ? `
            <div style="margin-top: 24px; padding: 16px; background: #fef3c7; border-radius: 12px;">
              <strong style="color: #92400e;">📎 ${files.length} archivo(s) adjunto(s)</strong>
            </div>
            ` : ''}
          </div>

          <div style="text-align: center; padding: 20px; color: #94a3b8; font-size: 12px;">
            Este mensaje fue enviado desde el formulario de contacto de US Agency
          </div>
        </div>
      `,
      attachments
    };

    // Send email
    await transporter.sendMail(mailOptions);

    // Send auto-reply to the user
    const autoReplyOptions = {
      from: `"US Agency" <DeveloperLuis17@gmail.com>`,
      to: email,
      subject: '✨ Hemos recibido tu mensaje - US Agency',
      html: `
        <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; background: #f8fafc; padding: 20px;">
          <div style="background: linear-gradient(135deg, #8b5cf6 0%, #06b6d4 100%); padding: 30px; border-radius: 16px 16px 0 0; text-align: center;">
            <h1 style="color: white; margin: 0; font-size: 28px;">¡Gracias por contactarnos!</h1>
          </div>

          <div style="background: white; padding: 30px; border-radius: 0 0 16px 16px; box-shadow: 0 4px 20px rgba(0,0,0,0.1);">
            <p style="color: #0f172a; font-size: 16px; line-height: 1.6;">
              Hola <strong>${name}</strong>,
            </p>
            <p style="color: #64748b; font-size: 16px; line-height: 1.6;">
              Hemos recibido tu mensaje y nos pondremos en contacto contigo en las próximas <strong>24 horas</strong>.
            </p>
            <p style="color: #64748b; font-size: 16px; line-height: 1.6;">
              Si tu consulta es urgente, puedes contactarnos directamente por WhatsApp:
            </p>
            <div style="text-align: center; margin: 30px 0;">
              <a href="https://wa.me/573147083182" style="display: inline-block; background: linear-gradient(135deg, #22c55e 0%, #16a34a 100%); color: white; padding: 14px 28px; border-radius: 12px; text-decoration: none; font-weight: 600;">
                💬 WhatsApp Directo
              </a>
            </div>
            <p style="color: #94a3b8; font-size: 14px; text-align: center;">
              Equipo US Agency
            </p>
          </div>
        </div>
      `
    };

    await transporter.sendMail(autoReplyOptions);

    console.log(`✅ Email sent successfully from ${name} (${email})`);

    res.json({
      success: true,
      message: 'Mensaje enviado correctamente'
    });

  } catch (error) {
    console.error('❌ Error sending email:', error);
    res.status(500).json({
      success: false,
      error: 'Error al enviar el mensaje. Intenta de nuevo.'
    });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
