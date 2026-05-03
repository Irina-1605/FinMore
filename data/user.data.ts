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


