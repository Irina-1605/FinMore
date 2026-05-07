import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { FinancePage } from '../pages/FinancePage';
import { loginUser } from '../data/user.data';

test.describe('Create transaction', () => {

    test('User can create an expense transaction', async ({ page }) => {
        const loginPage = new LoginPage(page);
        const financePage = new FinancePage(page);
        const user = loginUser();

        await test.step('Login with valid credentials', async () => {
            await loginPage.goto();
            await loginPage.login(user.email, user.password);
            await loginPage.checkUserLoggedIn();
        });

        await test.step('Navigate to Transactions page', async () => {
            await financePage.goToTransactions();
        });

        await test.step('Open "Add transaction" modal', async () => {
            await financePage.openAddTransactionModal();
        });

        await test.step('Select transaction type: Expense', async () => {
            await financePage.spendButton();
        });

        await test.step('Fill in the transaction form', async () => {
            await financePage.fillSum('100');
            await financePage.selectCategory('Продукти');
            await financePage.fillDescription('Test expense transaction');
        });

        await test.step('Submit the form and verify transaction was created', async () => {
            await financePage.createButton();
            await expect(financePage.transactionFormModal).not.toBeVisible();
            await expect(page.getByText('Транзакції (1)')).toBeVisible();
        });
    });

    test('User can create an income transaction', async ({ page }) => {
        const loginPage = new LoginPage(page);
        const financePage = new FinancePage(page);
        const user = loginUser();

        await test.step('Login with valid credentials', async () => {
            await loginPage.goto();
            await loginPage.login(user.email, user.password);
            await loginPage.checkUserLoggedIn();
        });

        await test.step('Navigate to Transactions page', async () => {
            await financePage.goToTransactions();
        });

        await test.step('Open "Add transaction" modal', async () => {
            await financePage.openAddTransactionModal();
        });

        await test.step('Select transaction type: Income', async () => {
            await financePage.incomeButton();
        });

        await test.step('Fill in the transaction form', async () => {
            await financePage.fillSum('500');
            await financePage.selectCategory('Зарплата');
            await financePage.fillDescription('Test income transaction');
        });

        await test.step('Submit the form and verify transaction was created', async () => {
            await financePage.createButton();
            await expect(financePage.transactionFormModal).not.toBeVisible();
            await expect(page.getByText('Транзакції (1)')).toBeVisible();
        });
    });

    test('User can cancel transaction creation', async ({ page }) => {
        const loginPage = new LoginPage(page);
        const financePage = new FinancePage(page);
        const user = loginUser();

        await test.step('Login with valid credentials', async () => {
            await loginPage.goto();
            await loginPage.login(user.email, user.password);
            await loginPage.checkUserLoggedIn();
        });

        await test.step('Navigate to Transactions page', async () => {
            await financePage.goToTransactions();
        });

        await test.step('Open "Add transaction" modal', async () => {
            await financePage.openAddTransactionModal();
        });

        await test.step('Cancel and verify modal closes', async () => {
            await financePage.cancelButton();
            await expect(financePage.transactionFormModal).not.toBeVisible();
        });
    });

});
