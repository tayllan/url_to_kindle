#!/usr/bin/node
const url_to_pdf = require('./url_to_pdf');
const pdf_to_kindle = require('./pdf_to_kindle');
const get_options = require('./command_line');

require('dotenv').config();

const [url, local, filepath] = get_options();

const emailConfig = {
    SMTP_HOST: process.env.SMTP_HOST,
    SMTP_PORT: process.env.SMTP_PORT,
    SENDER_ADDRESS: process.env.SENDER_ADDRESS,
    SENDER_PASS: process.env.SENDER_PASS,
    KINDLE_EMAIL: process.env.KINDLE_EMAIL
};

if (url) {
    url_to_pdf(url, process.env.PDF_FOLDER)
        .then(newFilepath => {
            if (local) {
                console.info('Local mode. Not sending PDF to Kindle');
                process.exit(0);
            }

            return pdf_to_kindle(newFilepath, emailConfig);
        })
        .then(console.info)
        .catch(console.error);
} else if (filepath) {
    pdf_to_kindle(filepath, emailConfig)
        .then(console.info)
        .catch(console.error);
}
