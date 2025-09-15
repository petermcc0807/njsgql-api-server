'use strict';

import getBooks from './mongodb';

const resolvers: any = {
    Query: {
        books: async () => {
            return await getBooks();
        }
    }
};

export default resolvers;
