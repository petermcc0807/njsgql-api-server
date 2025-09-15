# njsgql-api-server
The `njsgql-api-server` project implements a simple API backend that returns a collection of books to a frontend Next.js (React) web app.

## Hosting
The backend is hosted in [Vercel](https://vercel.com/).

The backend utilises [Apollo Server](https://www.apollographql.com/docs/apollo-server) (hosted in Vercel) to implement a GraphQL API that is called by the frontend.

The backend's database (queried by Apollo Server) is hosted in [MongoDB Atlas](https://www.mongodb.com/products/platform/atlas-database).

## Node.js Packages
The following Node.js packages are used:

* `express` (Express.js web application framework)

* `cors` (Cross-origin Resource Sharing)

* `@apollo/server` (Apollo Server)

* `@as-integrations/express5` (Apollo Server Express.js integration)

* `mongoose` (MongoDB Object Data Modeling)

* `dotenv` (`.env` file access)
