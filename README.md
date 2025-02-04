# Twitter Cookie Extractor

A simple utility to help you extract your Twitter (X) cookies in JSON format, making it easy to use with libraries like [`agent-twitter-client`](https://github.com/elizaOS/agent-twitter-client) or [`@the-convocation/twitter-scraper`](https://github.com/the-convocation/twitter-scraper).


## Why Use This?

Many Twitter API alternatives require your browser cookies to authenticate requests. This tool simplifies the process of extracting those cookies in the correct format.

## Installation

```bash
npm install -g twitter-cookie
```

## Usage

```bash
twitter-cookie <username> <password>
```

Or simply without installation:

```bash
npx twitter-cookie <username> <password>
```

Your cookies will be printed to the console as JSON array. You can then use it to initialize the `Scraper` class from `agent-twitter-client` or `@the-convocation/twitter-scraper`.

## Example

```ts
import { Scraper } from "agent-twitter-client";

const scraper = new Scraper();

await scraper.setCookies(cookies);

// use scraper to do something...
```

## Security Note

Keep your cookie file secure and never share it. These cookies provide full access to your Twitter account.

## License

MIT License