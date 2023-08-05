import {describe, expect, test} from '@jest/globals';
import config from "../../framework/config/config.js";
import book from "../../framework/services/book.js"
import user from "../../framework/services/user.js";
import { bookData, bookDataUpdated } from "../../framework/fixtures/books.json"

let id;
const userId = '47ab8150-f490-4e2b-94ec-bcf21d548592';
const isbn = '9781449337711'
const newIsbn = '9781593277574'
let token;

describe('BookStore endpoints', () => {

    test('Creating a new book', async () => {
        const res = await user.createUser(config.credentials)
        id = res.body.userID;
        token = await user.getToken(config.credentials)
        const response = await book.createBook(id, isbn, token)
        expect(response.status).toBe(201);
        expect(response.body).toEqual({"books": [{"isbn": `${isbn}`}]});
        await user.deleteUser(id, token)
    });

    test('Creating a book already present in the User\'s Collection should return the error', async () => {
       token = await user.getToken({
            'userName': 'OTUS_QA_JS_LipovaA2',
            'password': config.credentialsStatic.password
        })
        const response = await book.createBook(userId, isbn, token)
        expect(response.status).toBe(400);
        expect(response.body.code).toEqual('1210');
        expect(response.body.message).toEqual('ISBN already present in the User\'s Collection!');
        await user.deleteUser(id, token)
    });

    test('Deleting a book from User', async () => {
        const res = await user.createUser(config.credentials)
        id = res.body.userID;
        token = await user.getToken(config.credentials)
        await book.createBook(id, isbn, token)
        const response = await book.deleteBook(id, token)
        expect(response.status).toBe(204);
        await user.deleteUser(id, token)
    });

    test('Getting the book info', async () => {
        const response = await book.getBook(isbn)
        expect(response.status).toBe(200);
        expect(response.body).toEqual(bookData);
    });

    test('Updating book for User', async () => {
        const res = await user.createUser(config.credentials)
        id = res.body.userID;
        token = await user.getToken(config.credentials)
        await book.createBook(id, isbn, token)
        const response = await book.updateBook(id, isbn, newIsbn, token)
        expect(response.status).toBe(200);
        expect(response.body.userId).toEqual(id);
        expect(response.body.username).toEqual(config.credentials.userName);
        expect(response.body.books).toEqual(bookDataUpdated);
        await user.deleteUser(id, token)
    });

})
