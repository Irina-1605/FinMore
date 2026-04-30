import { Page, Locator, expect } from '@playwright/test';
import { Actions } from '../helpers/global actions';

 
export class LoginPage {
    readonly page: Page;
 
    // Locators
    readonly logo: Locator;
    readonly enterToSystem: Locator;
    readonly enterToRecord: Locator;
    readonly dontHaveRecord: Locator;
 
    readonly emailField: Locator;
    readonly passwordField: Locator;
 
    readonly inputEmail: Locator;
    readonly inputPassword: Locator;
    readonly buttonLogin: Locator;
    readonly elementName: Locator;
 
    readonly avatarka: Locator;
 
    readonly button: Locator;
    readonly registration: Locator;

    readonly credsIsNotValid: Locator;
 
    constructor(page: Page) {
        this.page = page;
 
        this.logo = page.locator('.lucide-log-in');
 
        this.enterToSystem = page.getByTestId('login-title');
        this.enterToRecord = page.locator('.text-gray-600').first();
        this.dontHaveRecord = page.locator('.text-gray-600').nth(1);
 
        this.emailField = page.locator('.block').nth(0);
        this.passwordField = page.locator('.block').nth(1);
 
        this.inputEmail = page.getByTestId('login-email-input');
        this.inputPassword = page.getByTestId('login-password-input');
        this.buttonLogin = page.getByTestId('login-submit-button');
        this.elementName = page.getByTestId('login-submit-button');
 
        this.avatarka = page.locator('.lucide-user');
 
        this.button = page.getByTestId('switch-to-register-button');
        this.registration = page.getByTestId('register-title');

        this.credsIsNotValid = page.getByTestId('login-error');
    }
 
    async goto() {
        await this.page.goto('/');
    }
 
    async checkURL() {
        await expect(this.page).toHaveURL('/');
    }
 
    async checkTitle() {
        await expect(this.page).toHaveTitle('Повнофункціональний фінансовий менеджер');
    }
 
    async checkLogoVisible() {
        await expect(this.logo).toBeVisible();
    }
 
    async checkLoginTexts() {
        await expect(this.enterToSystem).toHaveText('Вхід до системи');
 
        await expect(this.enterToRecord).toHaveText('Увійдіть до свого облікового запису');
 
        await expect(this.dontHaveRecord).toHaveText('Немає облікового запису? Зареєструватися');
    
    }
 
    async checkNegativeLoginTexts() {

        await expect(this.credsIsNotValid).toHaveText('Невірний email або пароль');

    }

    async checkLabels() {
        await expect(this.emailField).toHaveText('Email адреса');
        await expect(this.passwordField).toHaveText('Пароль');
    }
 
    async login(email: string, password: string) {

        await Actions.fillField(this.inputEmail, email);
        await Actions.fillField(this.inputPassword, password);

        // await this.inputEmail.fill(email);
        // await expect(this.inputEmail).toHaveValue(email);
 
        // await this.inputPassword.fill(password);
        // await expect(this.inputPassword).toHaveValue(password);

        await Actions.click(this.buttonLogin);
        
 
        // await this.buttonLogin.click();
    }
 
    async checkUserLoggedIn() {
        await expect(this.avatarka).toBeVisible();
    }
 
    async goToRegister() {
        await expect(this.button).toHaveText('Зареєструватися');
        await this.button.click();
    }
 
    async checkRegisterPage() {
        await expect(this.registration).toHaveText('Реєстрація');
    }
}