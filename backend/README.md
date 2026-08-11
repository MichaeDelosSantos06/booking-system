# Express TypeScript Prisma Boilerplate

A production-ready backend starter built with **Express.js**, **TypeScript**, **Prisma**, and **PostgreSQL**. This boilerplate provides a clean architecture and essential configurations to help you start building RESTful APIs quickly.

## Features

* Express.js 5
* TypeScript
* Prisma ORM
* PostgreSQL
* JWT Authentication
* Global Error Handler
* Async Handler
* Authentication Middleware
* Environment Variable Validation
* Helmet
* CORS
* Express Rate Limiter
* ESLint
* Docker Ready
* Clean Project Structure

## Tech Stack

* Node.js
* Express.js
* TypeScript
* Prisma
* PostgreSQL
* JWT
* ESLint
* Docker

## Project Structure

```text
src/
├── config/
├── controllers/
├── middlewares/
├── repositories/
├── routes/
├── services/
├── types/
├── utils/
└── server.ts

prisma/
```

## Installation

Clone the repository.

```bash
git clone <repository-url>
```

Install dependencies.

```bash
npm install
```

## Environment Variables

Create a `.env` file based on `.env.example`.

Example:

```env
PORT=3000
NODE_ENV=development
DATABASE_URL=
CLIENT_URL=http://localhost:5173
JWT_SECRET=
```

## Database

Generate the Prisma Client.

```bash
npx prisma generate
```

Run the database migrations.

```bash
npx prisma migrate dev
```

## Running the Application

Development mode:

```bash
npm run dev
```

Build the project:

```bash
npm run build
```

Start the production build:

```bash
npm start
```

## Linting

Check for linting issues.

```bash
npm run lint
```

Automatically fix supported issues.

```bash
npm run lint:fix
```

## License

MIT
