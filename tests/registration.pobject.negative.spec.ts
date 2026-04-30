import { test, expect } from '@playwright/test';

import { LoginPage } from '../pages/LoginPage';
import { RegistrationPage } from '../pages/RegistrationPage';

 
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

        // 3. All fields are empty

        const user = {

            name: '',

            email: '',

            password: '',

            confirmPassword: '',

            currency: 'USD'

        };

        await test.step('All fields are empty', async () => {

    
            await registrationPage.register(

                user.name,

                user.email,

                user.password,

                user.confirmPassword,

                user.currency

            );
            await registrationPage.checkRegistrationTexts();
            await expect(registrationPage.nameError).toBeVisible();
            await expect(registrationPage.emailError).toBeVisible();
            await expect(registrationPage.passwordError).toBeVisible();
            await expect(registrationPage.confirmPasswordError).toBeVisible();
            
        });


    });

});    