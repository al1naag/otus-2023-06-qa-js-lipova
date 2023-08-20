import supertest from 'supertest'
import config from '../config/config.js'
const { url } = config

const book = {
  async createBook (id, isbn, token) {
    return supertest(url)
      .post('/BookStore/v1/Books')
      .set('Authorization', `Bearer ${token}`)
      .send({
        userId: `${id}`,
        collectionOfIsbns: [
          {
            isbn: `${isbn}`
          }
        ]
      })
  },

  async updateBook (id, isbn, newIsbn, token) {
    return supertest(url)
      .put(`/BookStore/v1/Books/${isbn}`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        userId: `${id}`,
        isbn: `${newIsbn}`
      })
  },

  async deleteBook (id, token) {
    return supertest(url)
      .delete(`/BookStore/v1/Books?UserId=${id}`)
      .set('Authorization', `Bearer ${token}`)
  },

  async getBook (id) {
    return supertest(url)
      .get(`/BookStore/v1/Book?ISBN=${id}`)
  }
}

export default book
