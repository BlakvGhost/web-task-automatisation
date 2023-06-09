import { launch, Browser, Page } from "puppeteer-core"; // importation des modules nécessaires pour l'automatisation
import { scheduleJob } from "node-schedule"; // importation du module permettant de programmer des tâches
import dotenv from "dotenv"; // importation du module permettant de charger les variables d'environnement depuis un fichier .env

dotenv.config(); // chargement des variables d'environnement depuis le fichier .env

// Récupération des variables d'environnement
const LOGIN_URL = process.env.LOGIN_URL;
const DASHBOARD_URL = process.env.DASHBOARD_URL;
const CHROME_PATH = { executablePath: process.env.CHROME_PATH };
const LOGIN_EMAIL = process.env.LOGIN_EMAIL;
const LOGIN_PASSWORD = process.env.LOGIN_PASSWORD;
const AUTH_FORM_EMAIL_SELECTOR = process.env.AUTH_FORM_EMAIL_SELECTOR
const AUTH_FORM_PASSWORD_SELECTOR = process.env.AUTH_FORM_PASSWORD_SELECTOR;
const AUTH_FORM_SUBMIT_SELECTOR = process.env.AUTH_FORM_SUBMIT_SELECTOR;
const LOGIN_CRON = process.env.LOGIN_CRON;
const LOGOUT_CRON = process.env.LOGOUT_CRON;
const LOGOUT_BUTTON_SELECTOR = process.env.LOGOUT_BUTTON_SELECTOR;
const ONLINE_BUTTON_SELECTOR = process.env.ONLINE_BUTTON_SELECTOR;

let isLoggedIn = false;
let browser: Browser | null = null;
let page: Page | null = null;

// Fonction permettant d'afficher un message dans la console
function log(message: string): void {
  console.log("\n\x1b[34m" + message + "\x1b[0m");
}

// Fonction permettant de se connecter à la plateforme
async function connect(): Promise<{ browser: Browser; page: Page }> {
  browser = await launch(CHROME_PATH); // Démarrage du navigateur
  log("Instance Chrome démarrée");
  page = await browser.newPage(); // Création d'une nouvelle page dans le navigateur
  log("Nouvelle page ouverte");
  await page.goto(LOGIN_URL!); // Accès à l'URL de connexion
  log("Page " + LOGIN_URL + " ouverte");
  await page.type(AUTH_FORM_EMAIL_SELECTOR!, LOGIN_EMAIL!); // Saisie de l'adresse e-mail
  await page.type(AUTH_FORM_PASSWORD_SELECTOR!, LOGIN_PASSWORD!); // Saisie du mot de passe
  await page.click(AUTH_FORM_SUBMIT_SELECTOR!); // Clic sur le bouton de connexion
  log("Formulaire soumis");
  await page.waitForNavigation(); // Attente de la navigation
  log("Connecté avec succès");
  return { browser, page }; // Renvoi du navigateur et de la page courante
}

console.clear();
console.warn("Web Task Automatisation Script Started");
log("En attente...");

// Fonction permettant de se connecter à la plateforme
async function login(): Promise<void> {
  if (!isLoggedIn) {
    const { browser, page } = await connect(); // Connexion à la plateforme
    // Effectue une action pour marquer sa présence en ligne
    await page.click(ONLINE_BUTTON_SELECTOR!);
    log("Vous etes en ligne!");
    await browser.close(); // Ferme le navigateur
    log("Instance Chrome fermée");
    isLoggedIn = true; // Indique que l'utilisateur est connecté
  }
}

// Fonction permettant de se déconnecter de la plateforme
async function logout(): Promise<void> {
  if (isLoggedIn) {
    if (!browser || !page) {
      ({ browser, page } = await connect());
    }
    await page.goto(DASHBOARD_URL!); // Accès à l'URL du dashboard
    // Effectue une action pour se déconnecter de la plateforme
    await page.click(LOGOUT_BUTTON_SELECTOR!);
    await browser.close(); // Ferme le navigateur
    log("Instance Chrome fermée");
    isLoggedIn = false; // Indique que l'utilisateur est déconnecté
  }
}

// Planification de la tâche de connexion à la plateforme à 08h00min chaque jour
scheduleJob(LOGIN_CRON!, async () => {
  log("Se connecter à la plateforme...");
  await login();
});
// Planification de la tâche de deconnexion à la plateforme à 18h00min chaque jour
scheduleJob(LOGOUT_CRON!, async () => {
  log("Se déconnecter de la plateforme...");
  await logout();
});
