const puppeteer = require("puppeteer");

const BrowserConfig = async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto("https://data.typeracer.com/pit/profile?user=mjbx", {
    timeout: 0,
  });
  return page;
};
const fetchData = async (page) => {
  await page.reload();
  const data = await page.evaluate(() => {
    const val = document.querySelector(".User__WPM").innerText;
    const wpm = val.split(" ")[0];
    const Tests = document.querySelector(
      "body > div.ie-fixMinHeight > div > div.container > div.main > div.themeContent.pit > section:nth-child(1) > div.Section__Card__Body > div > div.Profile__Card__Stats > div.Profile__Card__Stats__Left > div:nth-child(3) > div > span.Stat__Top"
    ).innerText;
    const TopSpeed = document.querySelector(
      "body > div.ie-fixMinHeight > div > div.container > div.main > div.themeContent.pit > section:nth-child(1) > div.Section__Card__Body > div > div.Profile__Card__Stats > div.Profile__Card__Stats__Left > div:nth-child(2) > div > span.Stat__Top"
    ).innerText;
    return {
      wpm: wpm,
      tests: Tests,
      topSpeed: TopSpeed,
    };
  });
  return data;
};

BrowserConfig().then((page) => {
  fetchData(page).then((data) => {
    console.log(data);
  });
});
