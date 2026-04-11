# Blogify API

This project will be a backend API for a blogging application.

## Setup

1. Copy `.env.example` to `.env` and set `MONGO_URI` and `JWT_SECRET`.
2. Install dependencies with `npm install`.
3. Start the API with `npm run dev`.

## Security Flow

- Passwords are hashed with `bcryptjs` before storage.
- Login issues a JWT in an `HttpOnly` cookie.
- Protected routes read the token from `req.cookies.token`.
- Post updates and deletes enforce ownership checks.

## Main Routes

- `POST /api/v1/auth/register`
- `POST /api/v1/auth/login`
- `POST /api/v1/auth/logout`
- `GET /api/v1/posts`
- `GET /api/v1/posts/:id`
- `POST /api/v1/posts`
- `PUT /api/v1/posts/:id`
- `DELETE /api/v1/posts/:id`

## Postman

Import `Blogify.postman_collection.json` into Postman to test the happy-path, authentication, and authorization scenarios.
