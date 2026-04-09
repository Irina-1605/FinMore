import { test, expect } from '@playwright/test'
test.describe('проверка работы регистрации', () => {
    test.beforeEach (async ({ page }) => {
        await page.goto ('/');
        await page.getByTestId('switch-to-register-button').click();
    })

    test('проверка тайтла', async({page}) => {
        await expect (page).toHaveTitle ('Повнофункціональний фінансовий менеджер');
    })
    test('проверка лого', async({page})=> {
        const logo = page.locator('.lucide-user-plus');
        await expect (logo).toBeVisible ();
    })
    test('проверка текста', async({page})=> {
        const registration = page.getByTestId('register-title');
        await expect (registration).toBeVisible ();
        await expect (registration).toHaveText ('Реєстрація');

        const createNewRecord = page.locator('.text-gray-600').nth(0);
        await expect (createNewRecord).toBeVisible ();
        await expect (createNewRecord).toHaveText ('Створіть новий обліковий запис');

        const haveRecord = page.locator('.text-gray-600').nth(1);
        await expect (haveRecord).toBeVisible ();
        await expect (haveRecord).toHaveText ('Вже маєте обліковий запис? Увійти');

    })
    test('проверка регистрации', async({page})=>{
        const fullName = page.locator('.block').nth(0);
        await expect (fullName).toBeVisible ();
        await expect (fullName).toHaveText ("Повне ім'я");

        const inputName = page.getByTestId('register-name-input');
        await expect (inputName).toBeVisible ();
        await inputName.fill('test test');
        await expect (inputName).toHaveValue;

        const Email = page.locator('.block').nth(1);
        await expect (Email).toBeVisible ();
        await expect (Email).toHaveText ('Email адреса');

        const inputEmail = page.getByTestId('register-email-input');
        await expect(inputEmail).toBeVisible ();
        await inputEmail.fill('test@gmail.com');
        await expect(inputEmail).toHaveValue;

        const Password = page.locator('.block').nth(2);
        await expect (Password).toBeVisible ();
        await expect (Password).toHaveText ('Пароль');

        const inputPassword = page.getByTestId('register-password-input');
        await expect(inputPassword).toBeVisible ();
        await inputPassword.fill('qwerty');
        await expect(inputPassword).toHaveValue;

        const confirmPassword = page.locator('.block').nth(3);
        await expect(confirmPassword).toBeVisible ();
        await expect(confirmPassword).toHaveText('Підтвердження паролю');

        const inputConfirmPassword = page.getByTestId('register-confirm-password-input')
        await expect(inputConfirmPassword).toBeVisible ();
        await inputConfirmPassword.fill('qwerty');
        await expect(inputConfirmPassword).toHaveValue; 

        const currency = page.locator('.block').nth(4);
        await expect(currency).toBeVisible ();
        await expect(currency).toHaveText('Основна валюта');

        const registrationButton = page.getByTestId('register-submit-button');
        await expect(registrationButton).toBeVisible ();
        await expect(registrationButton).toHaveText('Зареєструватися');
        await registrationButton.click();

        const avatarka = page.locator('.lucide-user');
        await expect (avatarka).toBeVisible;

    })

});