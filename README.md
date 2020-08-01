# URL -> PDF -> Kindle

Send web pages as readable PDFs to your Kindle

## How to

1. Copy `.env.example` to `.env`
2. Add your credentials to `.env`
3. Pick a URL of your choice, an awesome post you've been wanting to read
4. Install the dependencies `yarn install`
5. Run `node index.js ${url}`, passing the url

Notes:

1. The `SENDER_ADDRESS` email needs to be whitelisted in the Amazon Settings
2. Even whitelisted, you may need to go through a verification step from Amazon, so be sure to check your `SENDER_ADDRESS` inbox