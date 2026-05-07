import { Page, Locator, expect } from '@playwright/test';
import { Actions } from '../helpers/GlobalActions';

export class FinancePage {
    readonly page: Page;

    // Navigation
    readonly transactionsNavLink: Locator;
    readonly addTransactionButton: Locator;
    readonly transactionFormModal: Locator;

    // Modal form locators
    readonly spend: Locator;
    readonly income: Locator;
    readonly enterSum: Locator;
    readonly category: Locator;
    readonly describe: Locator;
    readonly data: Locator;
    readonly bill: Locator;
    readonly teg: Locator;
    readonly plusButton: Locator;
    readonly cancel: Locator;
    readonly create: Locator;

    constructor(page: Page) {
        this.page = page;

        this.transactionsNavLink = page.getByTestId('nav-transactions');
        this.addTransactionButton = page.getByTestId('add-transaction-page-button');
        this.transactionFormModal = page.getByTestId('transaction-form-modal');

        this.spend = page.getByTestId('expense-type-button');
        this.income = page.getByTestId('income-type-button');
        this.enterSum = page.getByTestId('transaction-amount-input');
        this.category = page.getByTestId('transaction-category-select');
        this.describe = page.getByTestId('transaction-description-input');
        this.data = page.getByTestId('transaction-date-input');
        this.bill = page.getByTestId('transaction-account-select');
        this.teg = page.getByTestId('new-tag-input');
        this.plusButton = page.getByTestId('add-tag-button');
        this.cancel = page.getByTestId('transaction-form-cancel');
        this.create = page.getByTestId('transaction-form-submit');
    }

    async goToTransactions() {
        await Actions.click(this.transactionsNavLink, 'Транзакції (навігація)');
        await expect(this.addTransactionButton).toBeVisible();
    }

    async openAddTransactionModal() {
        await Actions.click(this.addTransactionButton, 'Додати транзакцію');
        await expect(this.transactionFormModal).toBeVisible();
    }

    async spendButton() {
        await Actions.click(this.spend, 'Витрати');
    }

    async incomeButton() {
        await Actions.click(this.income, 'Дохід');
    }

    async fillSum(amount: string) {
        await Actions.fillField(this.enterSum, amount, 'Сума');
    }

    async selectCategory(categoryLabel: string) {
        await this.category.waitFor({ state: 'visible' });
        await this.category.selectOption({ label: categoryLabel });
    }

    async fillDescription(text: string) {
        await Actions.fillField(this.describe, text, 'Опис');
    }

    async selectAccount(accountLabel: string) {
        await this.bill.waitFor({ state: 'visible' });
        await this.bill.selectOption({ label: accountLabel });
    }

    async fillDate(date: string) {
        await Actions.fillField(this.data, date, 'Дата');
    }

    async addTag(tagName: string) {
        await Actions.fillField(this.teg, tagName, 'Тег');
        await Actions.click(this.plusButton, 'Додати тег');
    }

    async cancelButton() {
        await Actions.click(this.cancel, 'Скасувати');
    }

    async createButton() {
        await Actions.click(this.create, 'Створити');
    }
}