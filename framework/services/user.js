import supertest from 'supertest'
import config from '../config/config.js'
const { url } = config

const user = {
  login: (payload) => {
    return supertest(url)
      .post('/Account/v1/Authorized')
      .send(payload)
  },

  createUser: (payload) => {
    return supertest(url)
      .post('/Account/v1/User')
      .set('Content-Type', 'application/json')
      .send(payload)
  },

  generateToken: (payload) => {
    return supertest(url)
      .post('/Account/v1/GenerateToken')
      .send(payload)
  },

  async getToken (payload) {
    const res = await this.generateToken(payload)
    return res.body.token
  },

  async deleteUser (id, token) {
    return supertest(url)
      .delete(`/Account/v1/User/${id}`)
      .set('Authorization', `Bearer ${token}`)
  },

  async getUser (id, token) {
    return supertest(url)
      .get(`/Account/v1/User/${id}`)
      .set('Authorization', `Bearer ${token}`)
  }
}

export default user
