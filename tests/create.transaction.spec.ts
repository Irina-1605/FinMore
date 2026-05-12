import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { FinancePage } from '../pages/FinancePage';
import { loginUser, transactionData } from '../data/user.data';

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
            await financePage.expenseButton();
        });

        await test.step('Fill in the transaction form', async () => {
            await financePage.fillSum(transactionData.expense.amount);
            await financePage.selectCategory(transactionData.expense.category);
            await financePage.fillDescription(transactionData.expense.description);
            await financePage.selectAccount(transactionData.expense.account);
            await financePage.fillDate(transactionData.expense.date);
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
            await financePage.fillSum(transactionData.income.amount);
            await financePage.selectCategory(transactionData.income.category);
            await financePage.fillDescription(transactionData.income.description);
            await financePage.selectAccount(transactionData.income.account);
            await financePage.fillDate(transactionData.income.date);
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
