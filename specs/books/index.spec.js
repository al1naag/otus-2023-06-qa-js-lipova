import {beforeAll, describe, expect, test} from '@jest/globals';
import config from "../../framework/config/config.js";
import book from "../../framework/services/helper/book.js"
import user from "../../framework/services/helper/user.js";

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
        expect(response.body).toEqual({
            "isbn": "9781449337711",
            "title": "Designing Evolvable Web APIs with ASP.NET",
            "subTitle": "Harnessing the Power of the Web",
            "author": "Glenn Block et al.",
            "publish_date": "2020-06-04T09:12:43.000Z",
            "publisher": "O'Reilly Media",
            "pages": 238,
            "description": "Design and build Web APIs for a broad range of clients—including browsers and mobile devices—that can adapt to change over time. This practical, hands-on guide takes you through the theory and tools you need to build evolvable HTTP services with Microsoft",
            "website": "http://chimera.labs.oreilly.com/books/1234000001708/index.html"
        });
    });

    test('Updating book for User', async () => {
        await book.createBook(config.credentials, id, isbn)
        const response = await book.updateBook(config.credentials, id, isbn, newIsbn)
        expect(response.status).toBe(200);
        expect(response.body.userId).toEqual(id);
        expect(response.body.username).toEqual(config.credentials.userName);
        expect(response.body.books).toEqual([
            {
                "isbn": "9781593277574",
                "title": "Understanding ECMAScript 6",
                "subTitle": "The Definitive Guide for JavaScript Developers",
                "author": "Nicholas C. Zakas",
                "publish_date": "2016-09-03T00:00:00.000Z",
                "publisher": "No Starch Press",
                "pages": 352,
                "description": "ECMAScript 6 represents the biggest update to the core of JavaScript in the history of the language. In Understanding ECMAScript 6, expert developer Nicholas C. Zakas provides a complete guide to the object types, syntax, and other exciting changes that E",
                "website": "https://leanpub.com/understandinges6/read"
            }
        ]);
    });

    test('Deleting a book from User', async () => {
        await book.createBook(config.credentials, id, isbn)
        const response = await book.deleteBook(config.credentials, id)
        expect(response.status).toBe(204);
    });
})
