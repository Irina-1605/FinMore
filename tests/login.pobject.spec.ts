import { test, expect } from '@playwright/test';

import { LoginPage } from '../pages/LoginPage';

 
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
 
        const user = {

            email: `admin@demo.com`,

            password: 'admin123',

        }

        await test.step('Fill registration form', async () => {

            await loginPage.login(

                user.email,

                user.password
                
            )

        });    
        
        // 5. Check user logged in

        await test.step('Verify user is logged in', async () => {

            await loginPage.checkUserLoggedIn();

        });
 
    });

});

 