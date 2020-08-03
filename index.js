#!/usr/bin/node
const url_to_pdf = require('./url_to_pdf');
const pdf_to_kindle = require('./pdf_to_kindle');
const get_options = require('./command_line');

require('dotenv').config();

const email_config = {
    SMTP_HOST: process.env.SMTP_HOST,
    SMTP_PORT: process.env.SMTP_PORT,
    SENDER_ADDRESS: process.env.SENDER_ADDRESS,
    SENDER_PASS: process.env.SENDER_PASS,
    KINDLE_EMAIL: process.env.KINDLE_EMAIL
};

const main = async ([url, local, filepath], email_config) => {
    if (url) {
        filepath = await url_to_pdf(url, process.env.PDF_FOLDER);
        if (!filepath) {
            console.error(filepath);
            process.exit(1);
        }
    }

    if (local) {
        console.info('Local mode. Not sending PDF to Kindle');
        process.exit(0);
    }

    if (filepath) {
        const sent_to_kindle = await pdf_to_kindle(filepath, email_config);
        if (!sent_to_kindle) {
            console.error(sent_to_kindle);
            process.exit(1);
        }

        console.info(sent_to_kindle);
    }
}

main(get_options(), email_config);
