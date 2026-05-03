import { test, expect } from '@playwright/test';

import { LoginPage } from '../pages/LoginPage';
import { RegistrationPage } from '../pages/RegistrationPage';
import { invalidUserData } from '../data/user.data';

 
test.describe('Auth flow: Registration', () => {
 
    test('User can open login page, go to register and check negative cases', async ({ page }) => {
 
        const loginPage = new LoginPage(page);

        const registrationPage = new RegistrationPage(page);
 
        //  1. Open login page

        await test.step('Open login page', async () => {

            await loginPage.goto();
            await loginPage.goToRegister();


        });

        // 2. Go to registration

        await test.step('Go to registration page', async () => {

            await registrationPage.checkLogoVisible();
            await registrationPage.checkLoginTexts();


        });

        // 3. incorrect email

        const user = invalidUserData.incorrectEmail;

        await test.step('Incorrect Email', async () => {

            const currency = 'EUR';

    
            await registrationPage.register(

                user.name,

                user.email,

                user.password,

                user.confirmPassword,

                currency

            );
            await registrationPage.checkBrowserError();
            await registrationPage.checkRegistrationTexts();
            await expect(registrationPage.nameError).toBeVisible();
            await expect(registrationPage.emailError).toBeVisible();
            await expect(registrationPage.passwordError).toBeVisible();
            await expect(registrationPage.confirmPasswordError).toBeVisible();
            
        });


    });

});    