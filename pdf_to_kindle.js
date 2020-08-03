const nodemailer = require('nodemailer');

pdf_to_kindle = (filepath, emailConfig) => {
    if (!filepath) {
        return false;
    }

    const filename = filepath.split('/').pop();    
    const transporter = nodemailer.createTransport({
        host: emailConfig.SMTP_HOST,
        port: emailConfig.SMTP_PORT,
        secure: false,
        auth: {
            user: emailConfig.SENDER_ADDRESS,
            pass: emailConfig.SENDER_PASS
        },
        tls: {
            rejectUnauthorized: false
        }
    });

    console.info(`Sending (${filename}) to (${emailConfig.KINDLE_EMAIL})`);

    return transporter.sendMail({
        from: emailConfig.SENDER_ADDRESS,
        to: emailConfig.KINDLE_EMAIL,
        subject: `Sending ${filename}`,
        text: `Attached, ${filename}`,
        attachments: [
            {
                path: filepath
            }
        ]
    });
};

module.exports = pdf_to_kindle;
