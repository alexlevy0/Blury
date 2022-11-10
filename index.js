const puppeteer = require("puppeteer");
const { tableParser } = require("puppeteer-table-parser");
const fs = require("fs");
const { range } = require("lodash");
const { map } = require("modern-async");

const wait = (ms) => new Promise((res) => setTimeout(res, ms));

(async () => {
  const browser = await puppeteer.launch({
    defaultViewport: { width: 1920, height: 5080 },
  });
  const page = await browser.newPage();
  const URL = "https://www.facebook.com/sparkarhub/dashboard";
  await page.goto(URL, { waitUntil: "networkidle2" });

  /* Cookie Modal */
  const btnCookies = await page.$$("button");
  await btnCookies[btnCookies.length - 1].click();

  /* Login Form */
  await page.waitForSelector("#email");
  await page.$eval("#pass", (form) => form.click());
  const email = "REPLACE";
  const pwd = "REPLACE";

  await page.focus("#email");
  await page.keyboard.type(email);
  await page.focus("#pass");
  await page.keyboard.type(pwd);
  await page.keyboard.press("Enter");
  await page.waitForNavigation();

  /* Table Page */
  const urlDetail =
    "https://www.facebook.com/sparkarhub/insights/engagement/?filter=effectId%3DALL_EFFECTS%26time%3DALL_TIME";
  await page.goto(urlDetail, { waitUntil: "networkidle2" });
  const insightsSelector =
    "body > div._li > div._li > div > div > div > div.xeuugli.x2lwn1j.x78zum5.x1iyjqo2 > div.x1stqem3.x1n2onr6.x5yr21d.x11xpdln.x13dflua.x9lcvmn.xzkaem6.xy50hfi.x13zgxyt.x1xnm7x6.xq1unjd.xcpjkhm > div > div.xb57i2i.x1q594ok.x5lxg6s.x78zum5.xdt5ytf.x6ikm8r.x1ja2u2z.x1pq812k.x1rohswg.xfk6m8.x1yqm8si.xjx87ck.xx8ngbg.xwo3gff.x1n2onr6.x1oyok0e.x1odjw0f.x1e4zzel.x5yr21d > div.x78zum5.xdt5ytf.x1iyjqo2.x1n2onr6 > div > nav:nth-child(1) > div > div:nth-child(3) > div.x10l6tqk.x8knxv4.x3nfvp2.x1iyjqo2.x2lah0s.x17qophe.xds687c.x13vifvy.x1ey2m1c.x1sxyh0.xurb0ha > a > div > div";
  await page.waitForSelector(insightsSelector);
  await page.$eval(insightsSelector, (form) => form.click());
  await page.waitForSelector("table");
  await page.$eval(
    "body > div._li > div._li > div > div > div > div.xeuugli.x2lwn1j.x78zum5.x1iyjqo2 > div.xeuugli.x2lwn1j.x78zum5.xdt5ytf.x1iyjqo2.xkgjj3n.x1n2onr6.x1odjw0f > div > div > div.xeuugli.x2lwn1j.x78zum5.xdt5ytf.x1iyjqo2 > div > div > div > div:nth-child(3) > div > div > div.x9f619.x78zum5.x1iyjqo2.x5yr21d.x2lwn1j.x1n2onr6.xh8yej3 > div.xw2csxc.x1odjw0f.xh8yej3.x18d9i69 > div.x1iyjqo2.xs83m0k.xdl72j9.x3igimt.xedcshv.x1t2pt76.x1l90r2v.x1pi30zi.x1swvt13.xexx8yu > div.x78zum5.x1iyjqo2.x193iq5w.xeaf4i8.x1odjw0f.x62v5gn.x1gzqxud > div > table > thead > tr > th:nth-child(5)",
    (form) => form.click()
  );
  await wait(3000);

  const tableSelector =
    "body > div._li > div._li > div > div > div > div.xeuugli.x2lwn1j.x78zum5.x1iyjqo2 > div.xeuugli.x2lwn1j.x78zum5.xdt5ytf.x1iyjqo2.xkgjj3n.x1n2onr6.x1odjw0f > div > div > div.xeuugli.x2lwn1j.x78zum5.xdt5ytf.x1iyjqo2 > div > div > div > div:nth-child(3) > div > div > div.x9f619.x78zum5.x1iyjqo2.x5yr21d.x2lwn1j.x1n2onr6.xh8yej3 > div.xw2csxc.x1odjw0f.xh8yej3.x18d9i69 > div.x1iyjqo2.xs83m0k.xdl72j9.x3igimt.xedcshv.x1t2pt76.x1l90r2v.x1pi30zi.x1swvt13.xexx8yu > div.x78zum5.x1iyjqo2.x193iq5w.xeaf4i8.x1odjw0f.x62v5gn.x1gzqxud > div > table";
  const pageSelector =
    "body > div._li > div._li > div > div > div > div.xeuugli.x2lwn1j.x78zum5.x1iyjqo2 > div.xeuugli.x2lwn1j.x78zum5.xdt5ytf.x1iyjqo2.xkgjj3n.x1n2onr6.x1odjw0f > div > div > div.xeuugli.x2lwn1j.x78zum5.xdt5ytf.x1iyjqo2 > div > div > div > div:nth-child(3) > div > div > div.x9f619.x78zum5.x1iyjqo2.x5yr21d.x2lwn1j.x1n2onr6.xh8yej3 > div.xw2csxc.x1odjw0f.xh8yej3.x18d9i69 > div.x1iyjqo2.xs83m0k.xdl72j9.x3igimt.xedcshv.x1t2pt76.x1l90r2v.x1pi30zi.x1swvt13.xexx8yu > div.x78zum5.x1iyjqo2.x193iq5w.xeaf4i8.x1odjw0f.x62v5gn.x1gzqxud > div > table";
  await page.waitForSelector(tableSelector);

  await page.$eval(pageSelector, (t) => t.scrollTo(0, 100000));
  await page.$eval(tableSelector, (t) => t.scrollTo(0, 100000));
  await wait(3000);
  await page.$eval(tableSelector, (t) => t.scrollTo(0, 100000));
  await wait(3000);
  await page.$eval(tableSelector, (t) => t.scrollTo(0, 100000));
  await wait(3000);
  await page.$eval(tableSelector, (t) => t.scrollTo(0, 100000));
  await wait(3000);
  await page.$eval(tableSelector, (t) => t.scrollTo(0, 100000));
  await wait(3000);
  await page.$eval(tableSelector, (t) => t.scrollTo(0, 100000));
  await wait(3000);
  await page.$eval(tableSelector, (t) => t.scrollTo(0, 100000));
  await wait(3000);
  await page.$eval(tableSelector, (t) => t.scrollTo(0, 100000));
  await wait(3000);
  await page.$eval(tableSelector, (t) => t.scrollTo(0, 100000));
  await wait(3000);
  await page.$eval(tableSelector, (t) => t.scrollTo(0, 100000));
  await wait(3000);
  await page.$eval(tableSelector, (t) => t.scrollTo(0, 100000));
  await wait(10000);

  console.log("wait 2000ms");
  await wait(2000);
  console.log("wait 2000ms end");

  const table = await tableParser(page, {
    selector: tableSelector,
    allowedColNames: {
      Impressions: "Impressions",
      Opens: "Opens",
      Name: "Name",
      Captures: "Captures",
      Shares: "Shares",
      Saves: "Saves",
      Uses: "Uses",
      "Average time open": "Average time open",
    },
  });
  const csv = table
    .replaceAll("Needs update", "")
    .replaceAll("Unlinked account", "");

  console.log("csv", csv);

  fs.writeFileSync("export.csv", csv);

  await page.screenshot({ path: "screenshot.png" });

  await browser.close();
})();
