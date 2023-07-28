import supertest from "supertest"
import config from "../../config/config.js";
import user from "./user.js";
const { url } = config

const book = {
    async createBook(credentials, id, isbn) {
        const res = await user.generateToken(credentials)
        return supertest(url)
            .post('/BookStore/v1/Books')
            .set('Authorization', `Bearer ${res.body.token}`)
            .send({
                "userId": `${id}`,
                "collectionOfIsbns": [
                    {
                        "isbn": `${isbn}`
                    }
                ]
            })
    },

    async updateBook(credentials, id, isbn, newIsbn) {
        const res = await user.generateToken(credentials)
        return supertest(url)
            .put(`/BookStore/v1/Books/${isbn}`)
            .set('Authorization', `Bearer ${res.body.token}`)
            .send({
                "userId": `${id}`,
                "isbn": `${newIsbn}`
            })
    },

    async deleteBook (credentials, id) {
        const res = await user.generateToken(credentials)
        return supertest(url)
            .delete(`/BookStore/v1/Books?UserId=${id}`)
            .set('Authorization', `Bearer ${res.body.token}`)
    },

    async getBook(id){
    return supertest(url)
        .get(`/BookStore/v1/Book?ISBN=${id}`)
},
}

export default book