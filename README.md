# BDF-Lab-2
# Lab 2: SQLite Database and CRUD Routes

## Student Details

- **Name:** PENDYALA MANASA
- **Registration Number:** 252U1R1191
- **Section:** CSE-2D[214]
- **Course:** Backend Development Fundamentals

## Live Application

**Deployment URL:** PASTE YOUR DEPLOYED URL HERE

**Local URL:** http://localhost:3000/

## Project Description

This project implements a REST API using Node.js, Express.js, and SQLite. It supports CRUD (Create, Read, Update, and Delete) operations on a collection of books.

The application uses asynchronous database operations and parameterized SQL queries to safely process user input.

## Technologies Used

- Node.js
- Express.js
- SQLite
- sqlite3
- sqlite
- Nodemon
- Postman
- Git and GitHub

## Project Structure

```text
lab-02/
├── app.js
├── package.json
├── package-lock.json
├── .gitignore
├── README.md
├── database/
│   └── books.db
├── sql/
│   └── seed.sql
└── screenshots/
    ├── get-all-books.png
    ├── get-single-book.png
    ├── post-book.png
    ├── put-book.png
    ├── delete-book.png
    └── database-view.png
```

## Installation and Setup

### Prerequisites

- Node.js and npm
- SQLite command-line tools
- Postman

### 1. Clone the repository

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
```

Navigate to the lab folder:

```bash
cd YOUR_REPOSITORY_NAME/lab-02
```

### 2. Install dependencies

```bash
npm install
```

### 3. Initialize the database

Start the application:

```bash
npm run dev
```

The application creates the database directory and `book` table when the database is initialized.

If the database is empty, open another terminal and run:

```bash
sqlite3 database/books.db < sql/seed.sql
```

Do not execute the seed script repeatedly against the same database.

### 4. Start the server

For development:

```bash
npm run dev
```

For normal execution:

```bash
npm start
```

The server runs at:

http://localhost:3000/

### Environment Variables

| Variable | Description | Example |
|---|---|---|
| PORT | Port used by the Express server | 3000 |

The application defaults to port 3000 when `PORT` is not set.

## API Endpoints

Base URL: `http://localhost:3000`

| Method | Endpoint | Description |
|---|---|---|
| GET | `/books/` | Retrieve all books |
| GET | `/books/:bookId/` | Retrieve a book by ID |
| POST | `/books/` | Add a new book |
| PUT | `/books/:bookId/` | Update an existing book |
| DELETE | `/books/:bookId/` | Delete a book by ID |

### POST Request Example

**Endpoint:** `/books/`

**Request body:**

```json
{
  "title": "Clean Code",
  "author": "Robert C. Martin",
  "price": 500,
  "pages": 464
}
```

### PUT Request Example

**Endpoint:** `/books/1/`

**Request body:**

```json
{
  "title": "Wings of Fire - Updated",
  "author": "A. P. J. Abdul Kalam",
  "price": 300,
  "pages": 180
}
```

## Screenshots

### 1. Retrieve All Books

![GET all books](screenshots/get-all-books.png)

### 2. Retrieve a Single Book

![GET single book](screenshots/get-single-book.png)

### 3. Add a Book

![POST book](screenshots/post-book.png)

### 4. Update a Book

![PUT book](screenshots/put-book.png)

### 5. Delete a Book

![DELETE book](screenshots/delete-book.png)

### 6. SQLite Database Verification

![SQLite database view](screenshots/database-view.png)

## HTTP Status Codes

| Status Code | Meaning |
|---|---|
| 200 | Request completed successfully |
| 201 | Book created successfully |
| 400 | Invalid request data |
| 404 | Book not found |
| 500 | Internal server or database error |

## Security and Database Handling

- Parameterized SQL queries are used for user-supplied values.
- Database operations use `async/await`.
- The server starts only after successful database initialization.
- Request data is validated before inserting or updating records.
- The `.env` file and `node_modules` directory are excluded from Git.

## Problems Faced and Solutions

Document the actual problems you encountered while developing and testing this project.

Examples of topics to discuss, if applicable:

- SQLite database connection and initialization.
- SQL query parameterization.
- Testing HTTP requests in Postman.
- Handling nonexistent book IDs.
- Deploying an Express application.

## Conclusion

The project demonstrates SQLite database integration with Express.js and implements five REST API endpoints for creating, retrieving, updating, and deleting book records.
