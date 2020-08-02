const { Readability } = require('./mozilla/readability/index.js');
const { JSDOM } = require('jsdom');
const html_pdf = require('html-pdf');

url_to_pdf = (url, pdf_folder) => {
    if (!url) {
        return new Promise((resolve, reject) => reject(false));
    }

    console.info(`Downloading (${url})`);
    return JSDOM
        .fromURL(url)
        .then(dom => {
            const doc = new JSDOM(dom.serialize());
            const reader = new Readability(doc.window.document);
            const article = reader.parse();

            const title = article.title;
            const content = article.content;
            const filename = `${pdf_folder}/${title}.pdf`;
            const options = {
                'header': {
                    'height': '20mm',
                    'contents': `<div style='text-align: center;'>${title}</div>`
                }
            };

            console.info(`Saving (${filename})`);
            return new Promise((resolve, reject) => {
                html_pdf
                    .create(content, options)
                    .toFile(filename, (err, res) => {
                        if (err) {
                            reject(err);
                        }

                        resolve(filename);
                    });
            });
        });
};

module.exports = url_to_pdf;
