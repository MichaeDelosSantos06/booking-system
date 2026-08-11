# 🚀 Project Setup Guide

## 1. Install Dependencies

* Install all required packages.
* Install development dependencies.
* Run `npm install`.

## 2. Configure the Project

* Configure `package.json`.
* Configure `tsconfig.json`.
* Configure ESLint and Prettier (optional).
* Configure Git (`.gitignore`).

## 3. Environment Variables

* Create the `.env` file.
* Define all required environment variables.
* Create `src/config/env.ts` to validate and export environment variables.

## 4. Database Setup

* Configure the database connection.
* Create the Prisma schema.
* Run database migrations.
* Generate the Prisma Client.

## 5. Express Application Setup

* Create the Express application.
* Configure middleware:

  * Helmet
  * CORS
  * Rate Limiter
  * `express.json()`
  * `express.urlencoded()`

## 6. Core Utilities

* Create `AppError`.
* Create `asyncHandler`.
* Create the global `errorHandler`.
* Create the `notFound` middleware.

## 7. Authentication

* Create JWT utilities.
* Generate access tokens.
* Verify access tokens.
* Create the authentication middleware.
* Extend the Express `Request` type (`req.user`).

## 8. Application Architecture

* Create the project folder structure.
* Create routes.
* Create controllers.
* Create services.
* Create repositories.
* Create models/schema.

## 9. Development

* Start the development server.
* Test API endpoints.
* Write unit and integration tests.

## 10. Deployment

* Dockerize the application.
* Configure CI/CD.
* Deploy the backend.
* Configure production environment variables.
