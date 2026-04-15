import { test, expect } from '@playwright/test'
test.describe('проверка работы авторизации', () => {
    test.beforeEach (async ({ page }) => {
        await page.goto ('/');
    })
    test('проверка тайтла и юрл', async({page}) => {
        await test.step('проверка юрл', async() => {
        await expect (page).toHaveURL ('/');
        })
        await test.step('проверка тайтла', async() => {
        await expect (page).toHaveTitle ('Повнофункціональний фінансовий менеджер');
        })
    })
    test('проверка лого', async({page})=> {
        const logo = page.locator('.lucide-log-in');
        await expect (logo).toBeVisible ();
    })
    test('проверка текста', async({page})=> {
        const enterToSystem = page.getByTestId('login-title');
        await expect (enterToSystem).toBeVisible ();
        await expect (enterToSystem).toHaveText ('Вхід до системи');

        const enterToRecord = page.locator('.text-gray-600').first();
        await expect (enterToRecord).toBeVisible ();
        await expect (enterToRecord).toHaveText ('Увійдіть до свого облікового запису');

        const dontHaveRecord = page.locator('.text-gray-600').nth(1);
        await expect (dontHaveRecord).toBeVisible ();
        await expect (dontHaveRecord).toHaveText ('Немає облікового запису? Зареєструватися');

    })
    test('проверка логина',async({page})=> {
        const emailField = page.locator('.block').nth(0);
        await expect (emailField).toBeVisible ();
        await expect (emailField).toHaveText('Email адреса');

        const inputEmail = page.getByTestId ('login-email-input');
        await expect (inputEmail).toBeVisible ();
        await inputEmail.fill('admin@demo.com');
        await expect (inputEmail).toHaveValue ('admin@demo.com');

        const passwordField = page.locator('.block').nth(1);
        await expect (passwordField).toBeVisible ();
        await expect (passwordField).toHaveText('Пароль');

        const inputPassword = page.getByTestId ('login-password-input');
        await expect (inputPassword).toBeVisible ();
        await inputPassword.fill('admin123');
        await expect (inputPassword).toHaveValue ('admin123');

        const buttonLogin = page.getByTestId ('login-submit-button');
        await expect (buttonLogin).toBeVisible ();
        await buttonLogin.click();

        const avatarka = page.locator('.lucide-user');
        await expect (avatarka).toBeVisible ();

    })
    test('проверка регистрации', async({page}) => {
        const button = page.getByTestId('switch-to-register-button');
        await expect (button).toBeVisible ();
        await expect (button).toHaveText ('Зареєструватися');
        await button.click();

        const registration = page.getByTestId('register-title');
        await expect (registration).toBeVisible();
        await expect (registration).toHaveText('Реєстрація');
        
    })
});