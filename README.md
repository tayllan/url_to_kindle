# URL -> PDF -> Kindle

Send web pages as readable PDFs to your Kindle

You can also just download web pages as readable PDFs, or send existing files to your Kindle

## How to

1. Copy `.env.example` to `.env`
2. Add your credentials to `.env`
3. Install dependencies with `yarn install`
4. Pick a URL of your choice, or an existing file, something awesome you've been wanting to read
5. Run
    1. `./index.js --url <url>`, to send the URL as a PDF to your Kindle, or
    2. `./index.js --file <filepath>`, to send an existing file to your Kindle

### Example

```sh
$ ./index.js
Usage: index.js --url [url] --local --file [filepath]

Options:
    --url           URL to be downloaded into a readable PDF file
    --local         If set, the downloaded PDF file will NOT be sent to your Kindle
    --file          Filepath to an existing file to send to your Kindle
    
Examples:
    ./index.js --url https://waitbutwhy.com/2019/08/story-intro.html
    ./index.js --url https://waitbutwhy.com/2019/08/story-intro.html --local
    ./index.js --file ./tmp/existing_file.pdf
```

Notes:

1. The `SENDER_ADDRESS` email needs to be whitelisted in the Amazon Settings
2. Even whitelisted, you may need to go through a verification step from Amazon, so be sure to check your `SENDER_ADDRESS` inbox
