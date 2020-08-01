const Readability = require('./mozilla/readability/index.js').Readability;
const JSDOM = require('jsdom').JSDOM;
const html_pdf = require('html-pdf');
const nodemailer = require('nodemailer');

require('dotenv').config();

if (process.argv.length < 3) {
    console.error('Missing arguments. `$ node index.js ${url}`');
    process.exit(1);
}

const url = process.argv[2];

console.info(`Downloading (${url})`);
JSDOM.fromURL(url).then(dom => {
    const doc = new JSDOM(dom.serialize());
    const reader = new Readability(doc.window.document);
    const article = reader.parse();

    const title = article.title;
    const content = article.content;
    const filename = `${process.env.PDF_FOLDER}/${title}.pdf`;
    const options = {
        'header': {
            'height': '20mm',
            'contents': `<div style='text-align: center;'>${title}</div>`
        }
    };

    console.info(`Saving (${filename})`);
    html_pdf
        .create(content, options)
        .toFile(filename, async (err, res) => {
            if (err) {
                console.error(err);
                process.exit(1);
            }

            const transporter = nodemailer.createTransport({
                host: process.env.SMTP_HOST,
                port: process.env.SMTP_PORT,
                secure: false,
                auth: {
                    user: process.env.SENDER_ADDRESS,
                    pass: process.env.SENDER_PASS
                },
                tls: {
                    rejectUnauthorized: false
                }
            });

            console.info(`Sending (${title}.pdf) to (${process.env.KINDLE_EMAIL})`);
            const info = await transporter.sendMail({
                from: process.env.SENDER_ADDRESS,
                to: process.env.KINDLE_EMAIL,
                subject: `Sending ${title}.pdf`,
                text: `Attached, ${title}.pdf`,
                attachments: [
                    {
                        path: filename
                    }
                ]
            }).catch(console.error);
              
            console.log(`File sent: ${info.messageId}`);
        });
});