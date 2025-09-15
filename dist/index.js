'use strict';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import http from 'http';
import express from 'express';
const typeDefs = `#graphql
    # The "Book" type defines the queryable fields for every book.
    type Book {
    id: ID!
    title: String!
    author: Author!
    }

    # The "Author" type defines the fields for an author.
    type Author {
    id: ID!
    name: String!
    books: [Book!]
    }

    # The "Query" type lists all available queries.
    type Query {
    books: [Book!]
    book(id: ID!): Book
    authors: [Author!]
    }

    # The "Mutation" type is the entry point for all data-modifying operations.
    type Mutation {
    addBook(title: String!, authorId: ID!): Book!
    }
`;
const resolvers = {
    Query: {
        books: () => []
    }
};
const expressApplication = express();
const httpServer = http.createServer(expressApplication);
const config = {
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })]
};
