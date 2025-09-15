'use strict';

import http from 'http';
import { ListenOptions } from 'net';

import express from 'express';
import cors from 'cors';

import { ApolloServer, ApolloServerOptions, BaseContext } from '@apollo/server';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';

import { expressMiddleware, ExpressMiddlewareOptions } from '@as-integrations/express5';

import typeDefs from '../lib/schemas';
import resolvers from '../lib/resolvers';

import 'dotenv/config';

interface Context {
    token?: string;
}

const expressApplication = express();

const httpServer = http.createServer(expressApplication);

(async () =>
{
    const config: ApolloServerOptions<Context> =
    {
        typeDefs,
        resolvers,

        plugins: [ ApolloServerPluginDrainHttpServer({ httpServer }) ]
    };

    const apolloServer = new ApolloServer<Context>(config);

    await apolloServer.start();

    const expressMiddlewareOptions: ExpressMiddlewareOptions<BaseContext> =
    {
        context: async ({ req }) => ({ token: req.headers.token })
    };

    expressApplication.use('/', cors<cors.CorsRequest>(), express.json({ limit: '50mb' }), expressMiddleware(apolloServer, expressMiddlewareOptions));

    const httpServerOptions: ListenOptions =
    {
        port: Number(process.env.PORT)
    };

    const httpServerListen = new Promise<void>((resolve, reject) => httpServer.listen(httpServerOptions, resolve));

    await httpServerListen;
})();

export default httpServer;
