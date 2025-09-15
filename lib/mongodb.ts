'use strict';

const assert = require('assert').strict;

import mongoose from 'mongoose';

import 'dotenv/config';

import Book from './types';

const BookSchema = new mongoose.Schema({
    uuid: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    isbn: {
        type: String,
        required: true
    }
});

const BookModel = mongoose.model(process.env.MONGODB_COLLECTION_BOOKS, BookSchema);

const getBooks = async (): Promise<Array<Book>> =>
{
    let books: Array<Book>;

    try
    {
        const uri = process.env.MONGODB_URI;

        const skip: number = 0;

        const limit = Number(process.env.MONGODB_FIND_LIMIT);

        await mongoose.connect(uri);

        const documents = await BookModel.find({ }, { _id: 0 })
                                         .skip(skip)
                                         .limit(limit)
                                         .lean();

        assert(documents, 'documents null');

        books = documents as Array<Book>;
    }

    catch (exception)
    {
        // Do something

        books = Array<Book>();
    }

    return books;
};

export default getBooks;
