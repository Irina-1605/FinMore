import { test, expect } from '@playwright/test';

import { LoginPage } from '../pages/LoginPage';
import { loginUser } from '../data/user.data';
import data from '../data/data.json';

 
test.describe('Auth flow: Login', () => {
 
    test('User can open login page, go to register and create account', async ({ page }) => {
 
        const loginPage = new LoginPage(page);

 
        //  1. Open login page

        await test.step('Open login page', async () => {

            await loginPage.goto();

            await loginPage.checkURL();

            await loginPage.checkTitle();

        });
 
        //  2. Check UI login page

        await test.step('Validate login UI', async () => {

            await loginPage.checkLogoVisible();

            await loginPage.checkLoginTexts();

            await loginPage.checkLabels();

        });
 
        // const user = loginUser();
        
        // const user = {

        //     email: `admin@demo.com`,

        //     password: 'admin123',

        // }

          
        await test.step('Fill registration form invalid user', async () => {

            await loginPage.login(

                data.invalidUser.email,
                data.invalidUser.password
            )

        });    
        
        // 5. Check user logged in

        await test.step('Verify creds are not valid', async () => {

            await loginPage.checkNegativeLoginTexts();

        });
 
    });

});