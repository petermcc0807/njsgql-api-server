'use strict';

const typeDefs: string = `#graphql
    type Book {
        uuid: String!
        title: String!
        author: String!
        isbn: String!
    }

    type Query {
        books: [Book!]
    }
`;

export default typeDefs;
