#!/usr/bin/env node
import { Scraper } from "agent-twitter-client";
import { setGlobalDispatcher, ProxyAgent } from "undici";

if (process.env.https_proxy) {
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
  const dispatcher = new ProxyAgent({
    uri: new URL(process.env.https_proxy).toString(),
  });
  setGlobalDispatcher(dispatcher);
}

const [username, password] = process.argv.slice(2);
if (!username || !password) {
  console.error(`
Usage: twitter-cookie <username> <password>

Arguments:
  username    Twitter username
  password    Twitter password

Example:
  twitter-cookie myuser mypass123
`);
  process.exit(1);
}

const scraper = new Scraper();

void scraper
  .login(username, password)
  .then(() => {
    console.log("\nLogin successful");
    void scraper
      .getCookies()
      .then((cookies) => {
        console.log("Reformatting cookies ...\n");
        const cookieJson = cookies.map((item) => item.toString());
        console.log(JSON.stringify(cookieJson, null, 2));
      })
      .catch((error) => {
        console.error("Fail to retrieve cookies", error);
        process.exit(1);
      });
  })
  .catch((error) => {
    console.error("Fail to login", error);
    process.exit(1);
  });
