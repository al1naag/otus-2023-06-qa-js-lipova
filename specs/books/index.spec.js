import {beforeAll, describe, expect, test} from '@jest/globals';
import config from "../../framework/config/config.js";
import book from "../../framework/services/helpers/book.js"
import user from "../../framework/services/helpers/user.js";
import { bookData, bookDataUpdated } from "../../framework/fixtures/books.json"

let id;
const userId = '47ab8150-f490-4e2b-94ec-bcf21d548592';
const isbn = '9781449337711'
const newIsbn = '9781593277574'

beforeEach(async () => {
    const res = await user.createUser(config.credentials)
    id = res.body.userID;
});

afterEach(async () => {
    await user.deleteUser(id)
});
describe('BookStore endpoints', () => {

    test('Creating a new book', async () => {
        const response = await book.createBook(config.credentials, id, isbn)
        expect(response.status).toBe(201);
        expect(response.body).toEqual({"books": [{"isbn": `${isbn}`}]});
    });

    test('Creating a book already present in the User\'s Collection should return the error', async () => {
        const response = await book.createBook({
            'userName': 'OTUS_QA_JS_LipovaA2',
            'password': config.credentials.password
        }, userId, isbn)
        expect(response.status).toBe(400);
        expect(response.body.code).toEqual('1210');
        expect(response.body.message).toEqual('ISBN already present in the User\'s Collection!');
    });

    test('Getting the book info', async () => {
        const response = await book.getBook(isbn)
        expect(response.status).toBe(200);
        expect(response.body).toEqual(bookData);
    });

    test('Updating book for User', async () => {
        await book.createBook(config.credentials, id, isbn)
        const response = await book.updateBook(config.credentials, id, isbn, newIsbn)
        expect(response.status).toBe(200);
        expect(response.body.userId).toEqual(id);
        expect(response.body.username).toEqual(config.credentials.userName);
        expect(response.body.books).toEqual(bookDataUpdated);
    });

    test('Deleting a book from User', async () => {
        await book.createBook(config.credentials, id, isbn)
        const response = await book.deleteBook(config.credentials, id)
        expect(response.status).toBe(204);
    });
})
