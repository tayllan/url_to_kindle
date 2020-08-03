const { argv } = require('yargs');

get_options = () => {
    const url = argv.url;
    const filepath = argv.file;
    
    if (!url && !filepath) {
        // TODO: yargs obviously supports all of this helper printting.
        console.error(
            'Usage: index.js --url [url] --local --file [filepath]\n' +
            '\n' +
            'Options:\n' +
            '\t --url   \t URL to be downloaded into a readable PDF file\n' +
            '\t --local \t If set, the downloaded PDF file will NOT be sent to your Kindle\n' +
            '\t --file  \t Filepath to an existing file to send to your Kindle\n' +
            '\n' +
            'Examples:\n' +
            '\t ./index.js --url https://waitbutwhy.com/2019/08/story-intro.html\n' +
            '\t ./index.js --url https://waitbutwhy.com/2019/08/story-intro.html --local\n' +
            '\t ./index.js --file ./tmp/existing_file.pdf\n'
        );
        
        return [];
    }
    
    return [url, argv.local, filepath];
};

module.exports = get_options;
