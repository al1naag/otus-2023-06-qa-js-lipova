import { faker } from '@faker-js/faker'

const config = {
  url: 'https://bookstore.demoqa.com',
  credentials: {
    userName: faker.internet.userName(),
    password: faker.internet.password({ length: 20, memorable: false, pattern: /[a-zA-Z0-9_$%#!@]/, prefix: '_' })
  },
  credentialsStatic: {
    password: 'rwA234w_e3#22e'
  }

}
export default config
