import { test, expect } from '@playwright/test';

import { LoginPage } from '../pages/LoginPage';
import { RegistrPage } from '../pages/RegistrPage';

 
test.describe('Auth flow: Login + Registration', () => {
 
    test('User can open login page, go to register and create account', async ({ page }) => {
 
        const loginPage = new LoginPage(page);

        const registrPage = new RegistrPage(page);
 
        //  1. Open login page

        await test.step('Open login page', async () => {

            await loginPage.goto();
            await loginPage.goToRegister();


        });
 
       
 
        // 3. Go to registration

        await test.step('Go to registration page', async () => {

            await registrPage.checkLogoVisible();

            await registrPage.checkLoginTexts();

        });
 
        // 4. Register new user

        const user = {

            name: 'Test User',

            email: `test${Date.now()}@mail.com`,

            password: 'Qwerty123!',

            confirmPassword: 'Qwerty123!',

            currency: 'USD'

        };
 
        await test.step('Fill registration form', async () => {

            await registrPage.registr(

                user.name,

                user.email,

                user.password,

                user.confirmPassword,

                user.currency

            );

        });
 
        // 5. Check user logged in

        await test.step('Verify user is logged in', async () => {

            await registrPage.checkUserLoggedIn();

        });
 
    });

});

 