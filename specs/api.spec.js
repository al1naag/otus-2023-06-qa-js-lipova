import fetch from 'node-fetch';
import {expect, test} from '@jest/globals';

let user = `test${Math.random()}`;
const password =  "rwA234w_e3#22e";

test('Creating a new user',
    async () => {
        const url = 'https://bookstore.demoqa.com/Account/v1/User';
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "userName": `${user}`,
                "password": `${password}`
            })
        });
        const data = await response.json()
        const { username } = data;
        expect(response.status).toBe(201);
        expect(username).toEqual(user);
    });


test('Creating a user with the error: username is already used',
    async () => {
        const url = 'https://bookstore.demoqa.com/Account/v1/User';
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "userName": 'OTUS_QA_JS_Lipova',
                "password": `${password}`
            })
        });
        const data = await response.json();
        const { code, message } = data;
        expect(response.status).toBe(406)
        expect(code).toEqual('1204')
        expect(message).toEqual('User exists!')
    });

test('Creating a user with the error: password does not match the requirements',
    async () => {
        const url = 'https://bookstore.demoqa.com/Account/v1/User';
        let response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "userName": `${user}`,
                "password": "password"
            })
        });
        const data = await response.json()
        const { code, message } = data;
        expect(response.status).toBe(400)
        expect(code).toEqual('1300')
        expect(message).toEqual(`Passwords must have at least one non alphanumeric character, one digit ('0'-'9'), one uppercase ('A'-'Z'), one lowercase ('a'-'z'), one special character and Password must be eight characters or longer.`)
    });



test('Failed token generation',
    async () => {
        const url = 'https://bookstore.demoqa.com/Account/v1/GenerateToken';
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "userName": 'username',
                "password": `${password}`
            })
        });
        const data = await response.json()
        const { result, status, token } = data;
        expect(result).toEqual('User authorization failed.');
        expect(status).toEqual('Failed');
        expect(token).toEqual(null);
        expect(response.status).toBe(200)
    });

test('Successful token generation',
async () => {
    const url = 'https://bookstore.demoqa.com/Account/v1/GenerateToken';
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "userName": 'OTUS_QA_JS_Lipova',
            "password": `${password}`
        })
    });
    const data = await response.json()
    const { result, status, token } = data;
    expect(result).toEqual('User authorized successfully.');
    expect(status).toEqual('Success');
    expect(token).not.toBe(null)
    expect(response.status).toBe(200)
});