<img width="1856" height="1033" alt="Screenshot 2026-10-30 145910" src="https://github.com/user-attachments/assets/47260db4-393e-4c88-ae40-61a280f90cfb" /># BDF-Lab-2
## Lab 2: SQLite Database and CRUD Routes

## Student Details

- **Name:** PENDYALA MANASA
- **Registration Number:** 252U1R1191
- **Section:** CSE-2D[214]
- **Course:** Backend Development Fundamentals

## Live Application

**Deployment URL:** https://bdf-lab-2-hf2z.onrender.com/

**Local URL:** http://localhost:3000/

### Test the Deployed API

- [API Status](https://bdf-lab-2-hf2z.onrender.com/)
- [Retrieve All Books](https://bdf-lab-2-hf2z.onrender.com/books/)
- [Retrieve Book with ID 1](https://bdf-lab-2-hf2z.onrender.com/books/1/)

> Note: These endpoints require a successful deployment and a working database connection.

## Project Description

This project implements a RESTful API using Node.js, Express.js, and SQLite. It supports CRUD (Create, Read, Update, and Delete) operations on a collection of books.

The application uses asynchronous database operations and parameterized SQL queries to process user input safely.

The API allows users to retrieve all books, retrieve a specific book, add new books, update existing records, and delete books.

## Objective

The main objectives of this lab are:

- To understand backend development using Node.js and Express.js.
- To connect an Express application to an SQLite database.
- To implement REST API routes using HTTP methods.
- To perform CRUD operations on book records.
- To handle JSON request bodies and responses.
- To test API endpoints using HTTP testing tools.
- To deploy a backend application using Render.

## Technologies Used

- Node.js
- Express.js
- SQLite
- sqlite3
- sqlite
- Nodemon
- VS Code REST Client
- Git and GitHub
- Render

## Project Structure

```text
BDF-Lab-2/
├── app.js
├── package.json
├── package-lock.json
├── .gitignore
├── README.md
├── database/
│   └── books.db
├── seed.js
├── seed.sql
├── app.http
└── screenshots/
    ├── 01_get_all_books.png
    ├── 02_get_single_book.png
    ├── 03_post_add_book.png
    ├── 04_put_update_book.png
    ├── 05_delete_book.png
    └── 07_sqlite_cli_view.png
```

*Note: This structure reflects the files listed for the project. Update it if your actual repository differs.*

## Installation and Setup

### Prerequisites

Install the following tools:

- Node.js and npm
- Visual Studio Code
- Git
- SQLite command-line tools, if you want to execute SQL commands directly
- VS Code REST Client extension for testing HTTP requests

### 1. Clone the Repository

Open a terminal and run:

```bash
git clone https://github.com/pendyalamanasa823-design/BDF-Lab-2.git
```

Navigate to the project directory:

```bash
cd BDF-Lab-2
```

Make sure the directory contains `app.js` and `package.json`.

### 2. Install Dependencies

Run:

```bash
npm install
```

This installs the packages listed in `package.json`.

### 3. Initialize the Database

The application uses an SQLite database located at:

```text
database/books.db
```

If the project initializes the database automatically, start the application and allow its initialization code to run.

If the database needs to be populated manually, and the schema and seed script are compatible, execute:

```bash
sqlite3 database/books.db < seed.sql
```

**Important:** Do not execute the seed script repeatedly against the same database unless it is designed to handle repeated execution safely.

If the database is empty, verify that the `books` table exists and that the sample records have been inserted.

### 4. Start the Server

For development:

```bash
npm run dev
```

For normal execution:

```bash
npm start
```

The application should start on the configured port.

Open the local application:

http://localhost:3000/

To retrieve all books:

http://localhost:3000/books/

> If the server is already running, do not start a second instance on the same port.

## Environment Variables

| Variable | Description | Example |
|---|---|---|
| `PORT` | Port used by the Express server | `3000` |

The application can use port `3000` locally when no `PORT` environment variable is configured.

For deployment, the server should use the port supplied by Render.

Example:

```javascript
const PORT = process.env.PORT || 3000;
```

The server should listen on the configured port and bind to `0.0.0.0` when deployed to Render.

## API Endpoints

### Base URLs

**Local:**

```text
http://localhost:3000
```

**Deployed:**

```text
https://bdf-lab-2-hf2z.onrender.com
```

### Available Routes

| Method | Endpoint | Description |
|---|---|---|
| GET | `/books/` | Retrieve all books |
| GET | `/books/:bookId/` | Retrieve a book by ID |
| POST | `/books/` | Add a new book |
| PUT | `/books/:bookId/` | Update an existing book |
| DELETE | `/books/:bookId/` | Delete a book by ID |

The `:bookId` parameter represents the ID of the book to retrieve, update, or delete.

### 1. Retrieve All Books

**Method:** GET

**Endpoint:**

```text
/books/
```

Returns the available book records.

Example response:

```json
[
  {
    "id": 1,
    "title": "Wings of Fire",
    "author": "A. P. J. Abdul Kalam",
    "price": 250,
    "pages": 180
  }
]
```

The example illustrates the expected data format; the actual response depends on the records in the database.

### 2. Retrieve a Single Book

**Method:** GET

**Endpoint:**

```text
/books/1/
```

Returns the details of the book with ID `1`, if it exists.

### 3. Add a Book

**Method:** POST

**Endpoint:**

```text
/books/
```

**Request body:**

```json
{
  "title": "Clean Code",
  "author": "Robert C. Martin",
  "price": 500,
  "pages": 464
}
```

This request creates a new book record if the supplied data is valid.

### 4. Update a Book

**Method:** PUT

**Endpoint:**

```text
/books/1/
```

**Request body:**

```json
{
  "title": "Wings of Fire - Updated",
  "author": "A. P. J. Abdul Kalam",
  "price": 300,
  "pages": 180
}
```

This request updates the specified book if it exists and the request data is valid.

### 5. Delete a Book

**Method:** DELETE

**Endpoint:**

```text
/books/1/
```

This request deletes the book with ID `1`, if it exists.

Use an appropriate test record when performing delete operations.

## Testing the API

The API can be tested using the VS Code REST Client extension.

Open `app.http` and add requests such as the following:

```http
### 1. Check API status
GET http://localhost:3000/

### 2. Retrieve all books
GET http://localhost:3000/books/

### 3. Retrieve a single book
GET http://localhost:3000/books/1/

### 4. Add a book
POST http://localhost:3000/books/
Content-Type: application/json

{
  "title": "Clean Code",
  "author": "Robert C. Martin",
  "price": 500,
  "pages": 464
}

### 5. Update a book
PUT http://localhost:3000/books/1/
Content-Type: application/json

{
  "title": "Wings of Fire - Updated",
  "author": "A. P. J. Abdul Kalam",
  "price": 300,
  "pages": 180
}

### 6. Delete a book
DELETE http://localhost:3000/books/1/
```

Click **Send Request** above each request to execute it.

To test the deployed API, replace `http://localhost:3000` with:

```text
https://bdf-lab-2-hf2z.onrender.com
```

The exact response messages and HTTP status codes depend on the implementation in `app.js`.

## Screenshots

Screenshots should be stored in the `screenshots/` directory.

### 1. Retrieve All Books

![GET all books](screenshots/01_get_all_books.png)
<img width="527" height="672" alt="Screenshot 2026-10-30 152821" src="https://github.com/user-attachments/assets/059b31dc-8c94-4d48-b358-9d763b4923a4" />
<img width="547" height="670" alt="Screenshot 2026-10-30 152836" src="https://github.com/user-attachments/assets/5258edb4-29d8-4764-8e9c-d1773ee5dd8d" />
<img width="498" height="655" alt="Screenshot 2026-10-30 152848" src="https://github.com/user-attachments/assets/007cae7a-0cae-454b-a467-878f9e60f61f" />





### 2. Retrieve a Single Book

![GET single book](screenshots/02_get_single_book.png)
<img width="512" height="617" alt="Screenshot 2026-10-30 153148" src="https://github.com/user-attachments/assets/ba4e5fe7-c30b-4d71-bfc1-2e0746af24ac" />


### 3. Add a Book

![POST book](screenshots/03_post_add_book.png)
<img width="512" height="580" alt="Screenshot 2026-10-30 153808" src="https://github.com/user-attachments/assets/cad69ff4-a3ec-4599-a748-0a26689d19a5" />


### 4. Update a Book

![PUT book](screenshots/04_put_update_book.png)
<img width="540" height="492" alt="Screenshot 2026-10-30 153906" src="https://github.com/user-attachments/assets/694fcf29-f9e2-4992-bdb7-b6b5131019a8" />


### 5. Delete a Book

![DELETE book](screenshots/05_delete_book.png)
![Uploading Screenshot 2026-10-30 153954.png…]()


### 6. SQLite Database Verification

![SQLite database view](screenshots/07_sqlite_cli_view.png)

*Ensure the image files exist at the specified paths. GitHub will not display screenshots that have not been committed and pushed to the repository.*

## HTTP Status Codes

The following are common status codes for a CRUD API. The actual codes returned depend on the implementation.

| Status Code | Meaning |
|---|---|
| `200 OK` | Request completed successfully |
| `201 Created` | Resource created successfully |
| `400 Bad Request` | Invalid request data |
| `404 Not Found` | Requested book or route not found |
| `500 Internal Server Error` | Unexpected server or database error |

## Security and Database Handling

The project is designed to demonstrate the following backend practices:

- Use parameterized SQL queries for user-supplied values.
- Use asynchronous database operations.
- Initialize the database before handling requests when required by the application.
- Validate request data before inserting or updating records.
- Exclude `node_modules` and environment files from Git using `.gitignore`.

These practices should be verified against the actual implementation in `app.js`.

## Problems Faced and Solutions

### 1. SQLite3 Native Binary Error on Render

**Problem:** The deployment logs reported that `GLIBC_2.38` was not found by the SQLite3 native module.

**Cause:** The installed native binary required a Linux system library that was unavailable in the deployment environment.

**Troubleshooting:** Check the installed SQLite3 version and Render build logs. A compatible package version or a successful source build may resolve the issue.

### 2. Git Directory Deletion Errors

**Problem:** Git reported that it could not delete directories under `.git/objects/`.

**Troubleshooting:** Check the Git status, close processes that might be locking repository files, and check OneDrive synchronization if the project is stored in a synchronized folder.

Avoid manually deleting the `.git` directory.

### 3. Testing HTTP Methods

**Problem:** A browser can directly test GET requests but does not provide a convenient interface for POST, PUT, and DELETE requests with JSON bodies.

**Solution:** Use the VS Code REST Client extension and the requests in `app.http`.

### 4. Database Verification

**Problem:** API responses show JSON data rather than the database as a table.

**Solution:** Use the GET endpoints to inspect records or use a SQLite viewer or command-line tool to inspect the actual database.

### 5. Database Persistence on Render

**Problem:** Data stored in a local SQLite database file may not persist across deployments or service restarts.

**Solution:** If persistent data is required, configure an appropriate persistent storage option or migrate to a managed database. Confirm the hosting plan's available storage options before selecting a solution.

## Deployment on Render

The application is deployed using Render.

**Live URL:** https://bdf-lab-2-hf2z.onrender.com/

Typical configuration:

| Setting | Value |
|---|---|
| Service Type | Web Service |
| Build Command | `npm install` |
| Start Command | `npm start` |
| Port | `process.env.PORT` |

The build command may need to be adjusted if a native dependency must be compiled from source.

Official documentation: https://render.com/docs/deploy-node-express-app

## Conclusion

This lab demonstrates the development of a RESTful API using Node.js, Express.js, and SQLite.

The project provides practical experience with database integration, CRUD operations, HTTP request handling, JSON responses, API testing, dependency management, Git version control, and cloud deployment.
