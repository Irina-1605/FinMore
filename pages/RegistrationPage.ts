import { Page, Locator, expect } from '@playwright/test';
 
export class RegistrationPage {
    readonly page: Page;
 
    // Locators
    readonly logo: Locator;
    readonly registration: Locator;
    readonly createNewRecord: Locator;
    readonly haveRecord: Locator;
 
    readonly fullName: Locator;
    readonly inputName: Locator;
 
    readonly email: Locator;
    readonly inputEmail: Locator;
    readonly password: Locator;
    readonly inputPassword: Locator;
    readonly confirmPassword: Locator;
    readonly inputConfirmPassword: Locator;

    readonly currency: Locator;
    readonly currencySelect: Locator;

    readonly registrationButton: Locator;
 
    readonly avatarka: Locator;

    readonly nameError: Locator;
    readonly emailError: Locator;
    readonly passwordError: Locator;
    readonly confirmPasswordError: Locator;


    constructor(page: Page) {
        this.page = page;
 
        this.logo = page.locator('.lucide-user-plus');
 
        this.registration = page.getByTestId('register-title');
        this.createNewRecord = page.locator('.text-gray-600').first();
        this.haveRecord = page.locator('.text-gray-600').nth(1);
 
        this.fullName = page.locator('.block').nth(0);
        this.inputName = page.getByTestId('register-name-input');
 
        this.email = page.locator('.block').nth(1);
        this.inputEmail = page.getByTestId('register-email-input');
        
        this.password = page.locator('.block').nth(2);
        this.inputPassword = page.getByTestId('register-password-input');
        this.confirmPassword = page.locator('.block').nth(3);
        this.inputConfirmPassword = page.getByTestId('register-confirm-password-input');

        this.currency = page.locator('.block').nth(4);
        this.currencySelect = page.getByTestId('register-currency-select');

        this.registrationButton = page.getByTestId('register-submit-button');

        this.nameError = page.getByTestId('name-error');
        this.emailError = page.getByTestId('email-error');
        this.passwordError = page.getByTestId('password-error');
        this.confirmPasswordError = page.getByTestId('confirm-password-error');

        this.avatarka = page.locator('.lucide-user');

    }
    async checkLogoVisible() {
        await expect(this.logo).toBeVisible();
    }
 
    async checkLoginTexts() {
        await expect(this.registration).toHaveText('Реєстрація');
 
        await expect(this.createNewRecord).toHaveText('Створіть новий обліковий запис');
 
        await expect(this.haveRecord).toHaveText('Вже маєте обліковий запис? Увійти');

    }

    async checkRegistrationTexts() {

        await expect(this.nameError).toHaveText("Ім'я обов'язкове");

        await expect(this.emailError).toHaveText("Email обов'язковий");

        await expect(this.passwordError).toHaveText("Пароль обов'язковий");

        await expect(this.confirmPasswordError).toHaveText("Підтвердження паролю обов'язкове");


    }
 
    async checkLabels() {
        await expect(this.fullName).toHaveText("Повне ім'я");
        await expect(this.email).toHaveText('Email адреса');
        await expect(this.password).toHaveText('Пароль');
        await expect(this.confirmPassword).toHaveText('Підтвердження паролю');
        await expect(this.currency).toHaveText('Основна валюта');

    }
 
    async register(name: string, email: string, password: string, confirmPassword: string, currency: string) {
        await this.inputName.fill(name);
        await expect(this.inputName).toHaveValue(name);

        await this.inputEmail.fill(email);
        await expect(this.inputEmail).toHaveValue(email);
 
        await this.inputPassword.fill(password);
        await expect(this.inputPassword).toHaveValue(password);

        await this.inputConfirmPassword.fill(confirmPassword);
        await expect(this.inputConfirmPassword).toHaveValue(confirmPassword);

        await this.currencySelect.selectOption(currency);
        await expect(this.currencySelect).toHaveValue(currency);
 
        await this.registrationButton.click();
    }
 
    async checkUserLoggedIn() {
        await expect(this.avatarka).toBeVisible();
    }
 
}


