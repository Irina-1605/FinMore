import { test, expect } from '@playwright/test';

import { LoginPage } from '../pages/LoginPage';
import { RegistrationPage } from '../pages/RegistrationPage';
import { generateUser } from '../data/user.data';

 
test.describe('Auth flow: Registration', () => {
 
    test('User can open login page, go to register and create account', async ({ page }) => {
 
        const loginPage = new LoginPage(page);

        const registrationPage = new RegistrationPage(page);
 
        //  1. Open login page

        await test.step('Open login page', async () => {

            await loginPage.goto();
            await loginPage.goToRegister();


        });
 
       
 
        // 3. Go to registration

        await test.step('Go to registration page', async () => {

            await registrationPage.checkLogoVisible();

            await registrationPage.checkLoginTexts();

        });
 
        // 4. Register new user

        const user = generateUser();
        

        // const user = {

        //     name: 'Test User',

        //     email: `test${Date.now()}@mail.com`,

        //     password: 'Qwerty123!',

        //     confirmPassword: 'Qwerty123!',

        //     currency: 'USD'

        // };
 
        await test.step('Fill registration form', async () => {

            await registrationPage.register(

                user.name,

                user.email,

                user.password,

                user.confirmPassword,

                user.currency

            );

        });
 
        // 5. Check user logged in

        await test.step('Verify user is logged in', async () => {

            await registrationPage.checkUserLoggedIn();

        });
 
    });

});

 