export interface User {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
   
}
export interface Login {
    email: string;
    password: string;
}

 
export const generateUser = (): User => {
    const firstNames = ['john', 'anna', 'mike', 'sarah', 'alex', 'kate'];
    const lastNames = ['smith', 'johnson', 'brown', 'taylor', 'anderson'];

    const first = firstNames[Math.floor(Math.random() * firstNames.length)];
    const last = lastNames[Math.floor(Math.random() * lastNames.length)];
    const id = Math.random().toString(36).slice(2, 6);
 
    return {
        name: 'Test User',
        email: `${first}.${last}+${id}@gmail.com`,
        password: 'Qwerty123!',
        confirmPassword: 'Qwerty123!'
    };
};

export const loginUser = (): Login => {

    return {
       email: 'admin@demo.com',
       password: 'admin123'
    }

};

export interface Transaction {
    amount: string;
    category: string;
    description: string;
    account: string;
    date: string;
}

const today = new Date();
const todayDate = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;

const randomItem = <T>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];

const expenseCategories = ['Продукти', 'Транспорт', 'Розваги', 'Комунальні', "Здоров'я"];
const incomeCategories = ['Зарплата', 'Фриланс', 'Інвестиції'];
const accounts = ['Готівка', 'Картка ПриватБанку', 'Картка Монобанку', 'Ощадний рахунок'];

export const transactionData: Record<string, Transaction> = {
    expense: {
        amount: '100',
        category: randomItem(expenseCategories),
        description: 'Test expense transaction',
        account: randomItem(accounts),
        date: todayDate
    },
    income: {
        amount: '500',
        category: randomItem(incomeCategories),
        description: 'Test income transaction',
        account: randomItem(accounts),
        date: todayDate
    }
};

export const invalidUserData = {
    incorrectEmail: {
        name: 'Test User',
        email: 'invalidemail.com',
        password: 'Qwerty123!',
        confirmPassword: 'Qwerty123!'
    },
    emptyFields: {
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    },
    shortPassword: {
        name: 'Test User',
        email: 'test@gmail.com',
        password: '123',
        confirmPassword: '123'
    },
    passwordMismatch: {
        name: 'Test User',
        email: 'test@gmail.com',
        password: 'Qwerty123!',
        confirmPassword: 'Different123!'
    },
};


