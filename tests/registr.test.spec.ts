import { test, expect } from '@playwright/test'
test.describe('проверка работы регистрации', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/');
        await page.getByTestId('switch-to-register-button').click();
    })

    test('проверка тайтла', async ({ page }) => {
        await expect(page).toHaveTitle('Повнофункціональний фінансовий менеджер');
    })
    test('проверка лого', async ({ page }) => {
        const logo = page.locator('.lucide-user-plus');
        await expect(logo).toBeVisible();
    })
    test('проверка текста', async ({ page }) => {
        const registration = page.getByTestId('register-title');
        await expect(registration).toBeVisible();
        await expect(registration).toHaveText('Реєстрація');

        const createNewRecord = page.locator('.text-gray-600').nth(0);
        await expect(createNewRecord).toBeVisible();
        await expect(createNewRecord).toHaveText('Створіть новий обліковий запис');

        const haveRecord = page.locator('.text-gray-600').nth(1);
        await expect(haveRecord).toBeVisible();
        await expect(haveRecord).toHaveText('Вже маєте обліковий запис? Увійти');

    })
    test('проверка регистрации', async ({ page }) => {
        const fullName = page.locator('.block').nth(0);
        await expect(fullName).toBeVisible();
        await expect(fullName).toHaveText("Повне ім'я");

        const inputName = page.getByTestId('register-name-input');
        await expect(inputName).toBeVisible();
        await inputName.fill('test test');
        await expect(inputName).toHaveValue('test test');

        const Email = page.locator('.block').nth(1);
        await expect(Email).toBeVisible();
        await expect(Email).toHaveText('Email адреса');

        const inputEmail = page.getByTestId('register-email-input');
        await expect(inputEmail).toBeVisible();
        await inputEmail.fill('test@gmail.com');
        await expect(inputEmail).toHaveValue('test@gmail.com');

        const Password = page.locator('.block').nth(2);
        await expect(Password).toBeVisible();
        await expect(Password).toHaveText('Пароль');

        const inputPassword = page.getByTestId('register-password-input');
        await expect(inputPassword).toBeVisible();
        await inputPassword.fill('qwerty');
        await expect(inputPassword).toHaveValue('qwerty');

        const confirmPassword = page.locator('.block').nth(3);
        await expect(confirmPassword).toBeVisible();
        await expect(confirmPassword).toHaveText('Підтвердження паролю');

        const inputConfirmPassword = page.getByTestId('register-confirm-password-input')
        await expect(inputConfirmPassword).toBeVisible();
        await inputConfirmPassword.fill('qwerty');
        await expect(inputConfirmPassword).toHaveValue('qwerty');

        const currency = page.locator('.block').nth(4);
        await expect(currency).toBeVisible();
        await expect(currency).toHaveText('Основна валюта');

        const currencySelect = page.getByTestId('register-currency-select');
        const options = await currencySelect.locator('option').allTextContents();
        expect(options).toEqual([
            'Гривня (UAH)',
            'Долар США (USD)',
            'Євро (EUR)',
            'Фунт стерлінгів (GBP)'
        ]);

        await expect(currencySelect).toBeVisible();
        await currencySelect.selectOption('EUR');
        await expect(currencySelect).toHaveValue('EUR');

        const registrationButton = page.getByTestId('register-submit-button');
        await expect(registrationButton).toBeVisible();
        await expect(registrationButton).toHaveText('Зареєструватися');
        await registrationButton.click();

        const avatarka = page.locator('.lucide-user');
        await expect(avatarka).toBeVisible();

    })

    test('негативный тест все пустые поля', async ({ page }) => {
        const registrationButton = page.getByTestId('register-submit-button');
        await expect(registrationButton).toBeVisible();
        await expect(registrationButton).toHaveText('Зареєструватися');
        await registrationButton.click();

        const nameError = page.getByTestId('name-error');
        await expect(nameError).toBeVisible();
        await expect(nameError).toHaveText("Ім'я обов'язкове");

        const emailError = page.getByTestId('email-error');
        await expect(emailError).toBeVisible();
        await expect(emailError).toHaveText("Email обов'язковий");

        const passwordError = page.getByTestId('password-error');
        await expect(passwordError).toBeVisible();
        await expect(passwordError).toHaveText("Пароль обов'язковий");

        const confirmPasswordError = page.getByTestId('confirm-password-error');
        await expect(confirmPasswordError).toBeVisible();
        await expect(confirmPasswordError).toHaveText("Підтвердження паролю обов'язкове");

    })

    test('негативный тест пустое поле имени', async ({ page }) => {
        const Email = page.locator('.block').nth(1);
        await expect(Email).toBeVisible();
        await expect(Email).toHaveText('Email адреса');

        const inputEmail = page.getByTestId('register-email-input');
        await expect(inputEmail).toBeVisible();
        await inputEmail.fill('test@gmail.com');
        await expect(inputEmail).toHaveValue('test@gmail.com');

        const Password = page.locator('.block').nth(2);
        await expect(Password).toBeVisible();
        await expect(Password).toHaveText('Пароль');

        const inputPassword = page.getByTestId('register-password-input');
        await expect(inputPassword).toBeVisible();
        await inputPassword.fill('qwerty');
        await expect(inputPassword).toHaveValue('qwerty');

        const confirmPassword = page.locator('.block').nth(3);
        await expect(confirmPassword).toBeVisible();
        await expect(confirmPassword).toHaveText('Підтвердження паролю');

        const inputConfirmPassword = page.getByTestId('register-confirm-password-input')
        await expect(inputConfirmPassword).toBeVisible();
        await inputConfirmPassword.fill('qwerty');
        await expect(inputConfirmPassword).toHaveValue('qwerty');

        const currency = page.locator('.block').nth(4);
        await expect(currency).toBeVisible();
        await expect(currency).toHaveText('Основна валюта');

        const currencySelect = page.getByTestId('register-currency-select');
        const options = await currencySelect.locator('option').allTextContents();
        expect(options).toEqual([
            'Гривня (UAH)',
            'Долар США (USD)',
            'Євро (EUR)',
            'Фунт стерлінгів (GBP)'
        ]);

        await expect(currencySelect).toBeVisible();
        await currencySelect.selectOption('GBP');
        await expect(currencySelect).toHaveValue('GBP');

        const registrationButton = page.getByTestId('register-submit-button');
        await expect(registrationButton).toBeVisible();
        await expect(registrationButton).toHaveText('Зареєструватися');
        await registrationButton.click();

        const nameError = page.getByTestId('name-error');
        await expect(nameError).toBeVisible();
        await expect(nameError).toHaveText("Ім'я обов'язкове");
    })

    test('негативный тест пустое поле email', async ({ page }) => {
        const fullName = page.locator('.block').nth(0);
        await expect(fullName).toBeVisible();
        await expect(fullName).toHaveText("Повне ім'я");

        const inputName = page.getByTestId('register-name-input');
        await expect(inputName).toBeVisible();
        await inputName.fill('test test');
        await expect(inputName).toHaveValue('test test');

        const Password = page.locator('.block').nth(2);
        await expect(Password).toBeVisible();
        await expect(Password).toHaveText('Пароль');

        const inputPassword = page.getByTestId('register-password-input');
        await expect(inputPassword).toBeVisible();
        await inputPassword.fill('qwerty');
        await expect(inputPassword).toHaveValue('qwerty');

        const confirmPassword = page.locator('.block').nth(3);
        await expect(confirmPassword).toBeVisible();
        await expect(confirmPassword).toHaveText('Підтвердження паролю');

        const inputConfirmPassword = page.getByTestId('register-confirm-password-input')
        await expect(inputConfirmPassword).toBeVisible();
        await inputConfirmPassword.fill('qwerty');
        await expect(inputConfirmPassword).toHaveValue('qwerty');

        const currency = page.locator('.block').nth(4);
        await expect(currency).toBeVisible();
        await expect(currency).toHaveText('Основна валюта');

        const currencySelect = page.getByTestId('register-currency-select');
        const options = await currencySelect.locator('option').allTextContents();
        expect(options).toEqual([
            'Гривня (UAH)',
            'Долар США (USD)',
            'Євро (EUR)',
            'Фунт стерлінгів (GBP)'
        ]);

        await expect(currencySelect).toBeVisible();
        await currencySelect.selectOption('USD');
        await expect(currencySelect).toHaveValue('USD');

        const registrationButton = page.getByTestId('register-submit-button');
        await expect(registrationButton).toBeVisible();
        await expect(registrationButton).toHaveText('Зареєструватися');
        await registrationButton.click();

        const emailError = page.getByTestId('email-error');
        await expect(emailError).toBeVisible();
        await expect(emailError).toHaveText("Email обов'язковий");

    })

    test('негативный тест пустое поле password', async ({ page }) => {
    const fullName = page.locator('.block').nth(0);
        await expect(fullName).toBeVisible();
        await expect(fullName).toHaveText("Повне ім'я");

        const inputName = page.getByTestId('register-name-input');
        await expect(inputName).toBeVisible();
        await inputName.fill('test test');
        await expect(inputName).toHaveValue('test test');

        const Email = page.locator('.block').nth(1);
        await expect(Email).toBeVisible();
        await expect(Email).toHaveText('Email адреса');

        const inputEmail = page.getByTestId('register-email-input');
        await expect(inputEmail).toBeVisible();
        await inputEmail.fill('test@gmail.com');
        await expect(inputEmail).toHaveValue('test@gmail.com');

        const confirmPassword = page.locator('.block').nth(3);
        await expect(confirmPassword).toBeVisible();
        await expect(confirmPassword).toHaveText('Підтвердження паролю');

        const inputConfirmPassword = page.getByTestId('register-confirm-password-input')
        await expect(inputConfirmPassword).toBeVisible();
        await inputConfirmPassword.fill('qwerty');
        await expect(inputConfirmPassword).toHaveValue('qwerty');

        const currency = page.locator('.block').nth(4);
        await expect(currency).toBeVisible();
        await expect(currency).toHaveText('Основна валюта');

        const currencySelect = page.getByTestId('register-currency-select');
        const options = await currencySelect.locator('option').allTextContents();
        expect(options).toEqual([
            'Гривня (UAH)',
            'Долар США (USD)',
            'Євро (EUR)',
            'Фунт стерлінгів (GBP)'
        ]);

        await expect(currencySelect).toBeVisible();
        await currencySelect.selectOption('USD');
        await expect(currencySelect).toHaveValue('USD');

        const registrationButton = page.getByTestId('register-submit-button');
        await expect(registrationButton).toBeVisible();
        await expect(registrationButton).toHaveText('Зареєструватися');
        await registrationButton.click();

        const passwordError = page.getByTestId('password-error');
        await expect(passwordError).toBeVisible();
        await expect(passwordError).toHaveText("Пароль обов'язковий");

        const confirmPasswordError = page.getByTestId('confirm-password-error');
        await expect(confirmPasswordError).toBeVisible();
        await expect(confirmPasswordError).toHaveText("Паролі не співпадають");

    })
    test('негативный тест пустое поле confirm password', async ({ page }) => {
       const fullName = page.locator('.block').nth(0);
        await expect(fullName).toBeVisible();
        await expect(fullName).toHaveText("Повне ім'я");

        const inputName = page.getByTestId('register-name-input');
        await expect(inputName).toBeVisible();
        await inputName.fill('test test');
        await expect(inputName).toHaveValue('test test');

        const Email = page.locator('.block').nth(1);
        await expect(Email).toBeVisible();
        await expect(Email).toHaveText('Email адреса');

        const inputEmail = page.getByTestId('register-email-input');
        await expect(inputEmail).toBeVisible();
        await inputEmail.fill('test@gmail.com');
        await expect(inputEmail).toHaveValue('test@gmail.com');

        const Password = page.locator('.block').nth(2);
        await expect(Password).toBeVisible();
        await expect(Password).toHaveText('Пароль');

        const inputPassword = page.getByTestId('register-password-input');
        await expect(inputPassword).toBeVisible();
        await inputPassword.fill('qwerty');
        await expect(inputPassword).toHaveValue('qwerty');

        const currency = page.locator('.block').nth(4);
        await expect(currency).toBeVisible();
        await expect(currency).toHaveText('Основна валюта');

        const currencySelect = page.getByTestId('register-currency-select');
        const options = await currencySelect.locator('option').allTextContents();
        expect(options).toEqual([
            'Гривня (UAH)',
            'Долар США (USD)',
            'Євро (EUR)',
            'Фунт стерлінгів (GBP)'
        ]);

        await expect(currencySelect).toBeVisible();
        await currencySelect.selectOption('USD');
        await expect(currencySelect).toHaveValue('USD');

        const registrationButton = page.getByTestId('register-submit-button');
        await expect(registrationButton).toBeVisible();
        await expect(registrationButton).toHaveText('Зареєструватися');
        await registrationButton.click(); 

        const confirmPasswordError = page.getByTestId('confirm-password-error');
        await expect(confirmPasswordError).toBeVisible();
        await expect(confirmPasswordError).toHaveText("Підтвердження паролю обов'язкове");

    })

    test('негативный тест confirm password не совпадает', async ({ page }) => {
        const fullName = page.locator('.block').nth(0);
        await expect(fullName).toBeVisible();
        await expect(fullName).toHaveText("Повне ім'я");

        const inputName = page.getByTestId('register-name-input');
        await expect(inputName).toBeVisible();
        await inputName.fill('test test');
        await expect(inputName).toHaveValue('test test');

        const Email = page.locator('.block').nth(1);
        await expect(Email).toBeVisible();
        await expect(Email).toHaveText('Email адреса');

        const inputEmail = page.getByTestId('register-email-input');
        await expect(inputEmail).toBeVisible();
        await inputEmail.fill('test@gmail.com');
        await expect(inputEmail).toHaveValue('test@gmail.com');

        const Password = page.locator('.block').nth(2);
        await expect(Password).toBeVisible();
        await expect(Password).toHaveText('Пароль');

        const inputPassword = page.getByTestId('register-password-input');
        await expect(inputPassword).toBeVisible();
        await inputPassword.fill('qwerty');
        await expect(inputPassword).toHaveValue('qwerty');

        const confirmPassword = page.locator('.block').nth(3);
        await expect(confirmPassword).toBeVisible();
        await expect(confirmPassword).toHaveText('Підтвердження паролю');

        const inputConfirmPassword = page.getByTestId('register-confirm-password-input')
        await expect(inputConfirmPassword).toBeVisible();
        await inputConfirmPassword.fill('qwerty1');
        await expect(inputConfirmPassword).toHaveValue('qwerty1');

        const currency = page.locator('.block').nth(4);
        await expect(currency).toBeVisible();
        await expect(currency).toHaveText('Основна валюта');

        const currencySelect = page.getByTestId('register-currency-select');
        const options = await currencySelect.locator('option').allTextContents();
        expect(options).toEqual([
            'Гривня (UAH)',
            'Долар США (USD)',
            'Євро (EUR)',
            'Фунт стерлінгів (GBP)'
        ]);

        await expect(currencySelect).toBeVisible();
        await currencySelect.selectOption('UAH');
        await expect(currencySelect).toHaveValue('UAH');

        const registrationButton = page.getByTestId('register-submit-button');
        await expect(registrationButton).toBeVisible();
        await expect(registrationButton).toHaveText('Зареєструватися');
        await registrationButton.click();

        const confirmPasswordError = page.getByTestId('confirm-password-error');
        await expect(confirmPasswordError).toBeVisible();
        await expect(confirmPasswordError).toHaveText("Паролі не співпадають");

    })
    
});