# Node.js Course API

A REST API built with Node.js, Express, and MongoDB. It includes authentication, user and post routes, task management, and file uploads.

## Features

- JWT-based authentication
- User and post endpoints
- Authenticated task management
- File uploads using Cloudinary
- Request validation with Zod
- Security headers and configurable CORS

## Tech stack

- Node.js (ES modules)
- Express 5
- MongoDB with Mongoose
- JSON Web Tokens
- Cloudinary
- Swagger UI at `/docs`

## Getting started

### Requirements

- Node.js 20 or newer
- MongoDB connection string
- Cloudinary account credentials for upload functionality

### Install dependencies

```bash
npm install
```

### Configure environment variables

Create a `.env` file in the project root. Do not commit this file; it may contain credentials.

```env
PORT=3000
NODE_ENV=development
MONGO_URL_DEV=your-development-mongodb-connection-string
MONGO_URI_PR=your-production-mongodb-connection-string
JWT_SECRET=replace-with-a-long-random-secret
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
```

The server uses `MONGO_URL_DEV` when `NODE_ENV=development` and `MONGO_URI_PR` otherwise. Set the appropriate value in your deployment environment and keep all real credentials private.

### Start the server

```bash
npm start
```

The API listens on `http://localhost:3000` by default. Set `PORT` to use a different port.
Open `http://localhost:3000/docs` to view the Swagger UI.

## API route groups

| Prefix    | Purpose                   |
| --------- | ------------------------- |
| `/auth`   | Authentication            |
| `/users`  | User operations           |
| `/posts`  | Post operations           |
| `/admin`  | Administrative operations |
| `/upload` | File uploads              |
| `/tasks`  | Task management           |

Protected routes require a bearer token in the `Authorization` header:

```text
Authorization: Bearer <your-token>
```

## Project structure

```text
controllers/   Request handlers
middlewares/   Authentication, validation, uploads, and error handling
models/        Mongoose models
routes/        Express route definitions
schemas/       Zod validation schemas
utils/         Shared utilities and integrations
index.js       Application entry point
```

## Security notes

- Keep `.env` and all credentials out of version control.
- Use a unique, high-entropy `JWT_SECRET`.
- Restrict CORS to trusted client origins before deployment.
- Use HTTPS and production-grade environment variables when deployed.
