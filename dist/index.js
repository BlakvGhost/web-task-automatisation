"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const puppeteer_core_1 = require("puppeteer-core"); // importation des modules nécessaires pour l'automation
const node_schedule_1 = require("node-schedule"); // importation du module permettant de programmer des tâches
const dotenv_1 = __importDefault(require("dotenv")); // importation du module permettant de charger les variables d'environnement depuis un fichier .env
dotenv_1.default.config(); // chargement des variables d'environnement depuis le fichier .env
// Récupération des variables d'environnement
const LOGIN_URL = process.env.LOGIN_URL;
const DASHBOARD_URL = process.env.DASHBOARD_URL;
const CHROME_PATH = { executablePath: process.env.CHROME_PATH };
const LOGIN_EMAIL = process.env.LOGIN_EMAIL;
const LOGIN_PASSWORD = process.env.LOGIN_PASSWORD;
const AUTH_FORM_EMAIL_SELECTOR = process.env.AUTH_FORM_EMAIL_SELECTOR;
const AUTH_FORM_PASSWORD_SELECTOR = process.env.AUTH_FORM_PASSWORD_SELECTOR;
const AUTH_FORM_SUBMIT_SELECTOR = process.env.AUTH_FORM_SUBMIT_SELECTOR;
const LOGIN_CRON = process.env.LOGIN_CRON;
const LOGOUT_CRON = process.env.LOGOUT_CRON;
const LOGOUT_BUTTON_SELECTOR = process.env.LOGOUT_BUTTON_SELECTOR;
const ONLINE_BUTTON_SELECTOR = process.env.ONLINE_BUTTON_SELECTOR;
let isLoggedIn = false;
let browser = null;
let page = null;
// Fonction permettant d'afficher un message dans la console
function log(message) {
    console.log("\n\x1b[34m" + message + "\x1b[0m");
}
// Fonction permettant de se connecter à la plateforme
function connect() {
    return __awaiter(this, void 0, void 0, function* () {
        browser = yield (0, puppeteer_core_1.launch)(CHROME_PATH); // Démarrage du navigateur
        log("Instance Chrome démarrée");
        page = yield browser.newPage(); // Création d'une nouvelle page dans le navigateur
        log("Nouvelle page ouverte");
        yield page.goto(LOGIN_URL); // Accès à l'URL de connexion
        log("Page " + LOGIN_URL + " ouverte");
        yield page.type(AUTH_FORM_EMAIL_SELECTOR, LOGIN_EMAIL); // Saisie de l'adresse e-mail
        yield page.type(AUTH_FORM_PASSWORD_SELECTOR, LOGIN_PASSWORD); // Saisie du mot de passe
        yield page.click(AUTH_FORM_SUBMIT_SELECTOR); // Clic sur le bouton de connexion
        log("Formulaire soumis");
        yield page.waitForNavigation(); // Attente de la navigation
        log("Connecté avec succès");
        return { browser, page }; // Renvoi du navigateur et de la page courante
    });
}
log("En attente...");
// Fonction permettant de se connecter à la plateforme
function login() {
    return __awaiter(this, void 0, void 0, function* () {
        if (!isLoggedIn) {
            const { browser, page } = yield connect(); // Connexion à la plateforme
            // Effectue une action pour marquer sa présence en ligne
            yield page.click(ONLINE_BUTTON_SELECTOR);
            log("Vous etes en ligne!");
            yield browser.close(); // Ferme le navigateur
            log("Instance Chrome fermée");
            isLoggedIn = true; // Indique que l'utilisateur est connecté
        }
    });
}
// Fonction permettant de se déconnecter de la plateforme
function logout() {
    return __awaiter(this, void 0, void 0, function* () {
        if (isLoggedIn) {
            if (!browser || !page) {
                ({ browser, page } = yield connect());
            }
            yield page.goto(DASHBOARD_URL); // Accès à l'URL du dashboard
            // Effectue une action pour se déconnecter de la plateforme
            yield page.click(LOGOUT_BUTTON_SELECTOR);
            yield browser.close(); // Ferme le navigateur
            log("Instance Chrome fermée");
            isLoggedIn = false; // Indique que l'utilisateur est déconnecté
        }
    });
}
// Planification de la tâche de connexion à la plateforme à 23h17 chaque jour
(0, node_schedule_1.scheduleJob)(LOGIN_CRON, () => __awaiter(void 0, void 0, void 0, function* () {
    log("Se connecter à la plateforme...");
    yield login();
}));
(0, node_schedule_1.scheduleJob)(LOGOUT_CRON, () => __awaiter(void 0, void 0, void 0, function* () {
    log("Se déconnecter de la plateforme...");
    yield logout();
}));
