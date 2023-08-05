import { faker } from '@faker-js/faker';

const config = {
    url:"https://bookstore.demoqa.com",
    credentials: {
        'userName': `test${Math.random()}`,
        'password': faker.internet.password(20, false, /[a-zA-Z0-9_$%#!@]/, '_')
    },
    credentialsStatic: {
        'userName': `test${Math.random()}`,
        'password': "rwA234w_e3#22e"
    },

}
export default config