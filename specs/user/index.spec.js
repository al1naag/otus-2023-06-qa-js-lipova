import {describe, expect, test} from '@jest/globals';
import config from "../../framework/config/config.js";
import user from "../../framework/services/helper/user.js"

let id;

describe('User account', () => {

    test('Creating a new user', async () => {
        const response = await user.createUser(config.credentials)
        id = response.body.userID;
        expect(response.status).toBe(201);
        expect(response.body.username).toEqual(config.credentials.userName);
    });

    test('Creating a user with the error: username is already used',
        async () => {
            const response = await user.createUser({
                'userName': 'OTUS_QA_JS_LipovaA',
                'password': config.credentials.password
            })
            expect(response.status).toBe(406)
            expect(response.body.code).toEqual('1204')
            expect(response.body.message).toEqual('User exists!')
        });

    test('Creating a user with the error: password does not match the requirements',
        async () => {
            const response = await user.createUser({'userName': config.credentials.userName, 'password': 'password'})
            expect(response.status).toBe(400)
            expect(response.body.code).toEqual('1300')
            expect(response.body.message).toEqual(`Passwords must have at least one non alphanumeric character, one digit ('0'-'9'), one uppercase ('A'-'Z'), one lowercase ('a'-'z'), one special character and Password must be eight characters or longer.`)
        });


    test('Failed token generation should return the error',
        async () => {
            const response = await user.generateToken({'userName': 'username', 'password': config.credentials.password})
            expect(response.body.result).toEqual('User authorization failed.');
            expect(response.body.status).toEqual('Failed');
            expect(response.body.token).toEqual(null);
            expect(response.status).toBe(200)
        });

    test('Successful token generation',
        async () => {
            const response = await user.generateToken({
                'userName': 'OTUS_QA_JS_LipovaA',
                'password': config.credentials.password
            })
            expect(response.body.result).toEqual('User authorized successfully.');
            expect(response.body.status).toEqual('Success');
            expect(response.body.token).not.toBe(null)
            expect(response.status).toBe(200)
        });

    test('Authorization with valid credentials',
        async () => {
            const response = await user.login({
                'userName': 'OTUS_QA_JS_Lipova',
                'password': config.credentials.password
            })
            expect(response.body).toEqual(true);
            expect(response.status).toBe(200)
        });

    test('Authorization with invalid userName should return the error',
        async () => {
            const response = await user.login({'userName': 'username09090909', 'password': config.credentials.password})
            expect(response.status).toBe(404)
            expect(response.body.code).toEqual('1207')
            expect(response.body.message).toEqual('User not found!')
        });

    test('Authorization with invalid password should return the error',
        async () => {
            const response = await user.login({'userName': 'OTUS_QA_JS_Lipova', 'password': 'password'})
            expect(response.status).toBe(404)
            expect(response.body.code).toEqual('1207')
            expect(response.body.message).toEqual('User not found!')
        });

    test('Authorization with invalid password should return the error',
        async () => {
            const response = await user.login({'userName': 'OTUS_QA_JS_LipovaA', 'password': 'password'})
            expect(response.status).toBe(404)
            expect(response.body.code).toEqual('1207')
            expect(response.body.message).toEqual('User not found!')
        });

    test('Getting the user info with valid userID',
        async () => {
            const response = await user.getUser(id)
            expect(response.status).toBe(200)
            expect(response.body.userId).not.toBe(null)
            expect(response.body.username).not.toBe(null)
            expect(response.body.books).toEqual([])
        });

    test('Getting the user info with invalid userID should return the error',
        async () => {
            const response = await user.getUser(321)
            expect(response.status).toBe(401)
            expect(response.body.code).toBe('1207')
            expect(response.body.message).toBe('User not found!')
        });

    test('Deleting the user',
        async () => {
            const response = await user.deleteUser(id)
            expect(response.status).toBe(204)
            expect(response.body).toEqual({})
        });

    test('Deleting the user with invalid userID should return the error',
        async () => {
            const response = await user.deleteUser(321)
            expect(response.status).toBe(200)
            expect(response.body.code).toBe('1207')
            expect(response.body.message).toBe('User Id not correct!')
        });
})
