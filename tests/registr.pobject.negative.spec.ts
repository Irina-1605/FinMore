import { test, expect } from '@playwright/test';

import { LoginPage } from '../pages/LoginPage';
import { RegistrPage } from '../pages/RegistrPage';

 
test.describe('Auth flow: Registration', () => {
 
    test('User can open login page, go to register and check negative cases', async ({ page }) => {
 
        const loginPage = new LoginPage(page);

        const registrPage = new RegistrPage(page);
 
        //  1. Open login page

        await test.step('Open login page', async () => {

            await loginPage.goto();
            await loginPage.goToRegister();


        });

        // 2. Go to registration

        await test.step('Go to registration page', async () => {

            await registrPage.checkLogoVisible();
            await registrPage.checkLoginTexts();


        });

        // 3. All fields are empty

        await test.step('All fields are empty', async () => {

            await registrPage.registrationButton.click();
            await registrPage.checkRegistrationTexts();
            await expect(registrPage.nameError).toBeVisible();
            await expect(registrPage.emailError).toBeVisible();
            await expect(registrPage.passwordError).toBeVisible();
            await expect(registrPage.confirmPasswordError).toBeVisible();
            
        });


    });

});    