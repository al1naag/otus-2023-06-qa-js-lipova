import supertest from "supertest"
import config from "../../config/config.js";
const { url } = config

const user = {
    login: (payload) => {
        return supertest(url)
            .post('/Account/v1/Authorized').
            send(payload)
    },

    createUser: (payload) => {
        return supertest(url)
            .post('/Account/v1/User')
            .set('Content-Type', 'application/json')
            .send(payload)
    },

    generateToken: (payload) => {
        return supertest(url)
            .post('/Account/v1/GenerateToken').
            send(payload)
    },

    async deleteUser (id) {
        const res = await this.generateToken(config.credentials)
        return supertest(url)
            .delete(`/Account/v1/User/${id}`)
            .set('Authorization', `Bearer ${res.body.token}`)
    },

    async getUser (id){
        const res = await this.generateToken(config.credentials)

    return supertest(url)
        .get(`/Account/v1/User/${id}`)
        .set('Authorization', `Bearer ${res.body.token}`)
}
}

export default user