import { launch, Browser, Page } from 'puppeteer-core';
import { scheduleJob } from 'node-schedule';
import dotenv from 'dotenv';

dotenv.config();

const LOGIN_URL = process.env.LOGIN_URL;
const DASHBOARD_URL = process.env.DASHBOARD_URL;
const CHROME_PATH = { executablePath: process.env.CHROME_PATH }
const LOGIN_EMAIL = process.env.LOGIN_EMAIL;
const LOGIN_PASSWORD = process.env.LOGIN_PASSWORD;

let isLoggedIn = false;
let browser: Browser | null = null;
let page: Page | null = null;

function log(message: string): void {
  console.log(`\n${message}`);
}

async function connect(): Promise<{ browser: Browser, page: Page }> {
  browser = await launch(CHROME_PATH);
  log("Instance Chrome démarrée");
  page = await browser.newPage();
  log("Nouvelle page ouverte");
  await page.goto(LOGIN_URL);
  log(`Page ${LOGIN_URL} ouverte`);
  await page.type('#email', LOGIN_EMAIL);
  await page.type('#password', LOGIN_PASSWORD);
  await page.click('#signin-form button');
  log("Formulaire soumis");
  await page.waitForNavigation();
  log("Connecté avec succès");
  return { browser, page };
}

log("En attente...");

async function login(): Promise<void> {
  if (!isLoggedIn) {
    const { browser, page } = await connect();
    await page.click('#js-clock-in-out a');
    log("Présence en ligne marquée");
    await browser.close();
    log("Instance Chrome fermée");
    isLoggedIn = true;
  }
}

async function logout(): Promise<void> {
  if (isLoggedIn) {
    if (!browser || !page) {
      ({ browser, page } = await connect());
    }
    await page.goto(DASHBOARD_URL);
    await page.click('#js-clock-in-out a');
    await page.click("#ajaxModalContent [type='submit']");
    await page.click('a[href="https://pmp.jmaplus.com/index.php/signin/sign_out"]');
    await page.waitForNavigation();
    await browser.close();
    log("Instance Chrome fermée");
    isLoggedIn = false;
  }
}

scheduleJob('17 23 * * *', async () => {
  log('Se connecter à la plateforme...');
  await login();
});

scheduleJob('0 18 * * *', async () => {
  log('Se déconnecter de la plateforme...');
  await logout();
});
