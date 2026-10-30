const express = require("express");
const sqlite3 = require("sqlite3");
const { open } = require("sqlite");
const path = require("path");
const fs = require("fs");

const app = express();

app.use(express.json());

const PORT = process.env.PORT || 3000;

const databaseDirectory = path.join(__dirname, "database");

if (!fs.existsSync(databaseDirectory)) {
  fs.mkdirSync(databaseDirectory, { recursive: true });
}

const databasePath = path.join(databaseDirectory, "books.db");

let db;

// Initialize database and start server
async function initializeDBAndServer() {
  try {
    db = await open({
      filename: databasePath,
      driver: sqlite3.Database,
    });

    await db.exec(`
      CREATE TABLE IF NOT EXISTS book (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        author TEXT NOT NULL,
        price INTEGER NOT NULL,
        pages INTEGER NOT NULL
      );
    `);

    // Insert sample books only when the table is empty
    const result = await db.get(
      "SELECT COUNT(*) AS count FROM book"
    );

    if (result.count === 0) {
      const books = [
        ["Wings of Fire", "A. P. J. Abdul Kalam", 250, 180],
        ["The Alchemist", "Paulo Coelho", 300, 208],
        ["Atomic Habits", "James Clear", 450, 320],
        ["Rich Dad Poor Dad", "Robert Kiyosaki", 350, 336],
        ["Ikigai", "Hector Garcia", 280, 194],
        ["The Power of Habit", "Charles Duhigg", 400, 371],
        ["Deep Work", "Cal Newport", 380, 296],
        ["Think and Grow Rich", "Napoleon Hill", 320, 238],
        ["The Psychology of Money", "Morgan Housel", 290, 256],
        ["Zero to One", "Peter Thiel", 340, 224],
      ];

      for (const book of books) {
        await db.run(
          `INSERT INTO book (title, author, price, pages)
           VALUES (?, ?, ?, ?)`,
          book
        );
      }

      console.log("10 sample books inserted successfully.");
    }

    app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}/`);
    });
  } catch (error) {
    console.error("Database initialization failed:", error.message);
    process.exit(1);
  }
}

// Home route
app.get("/", (request, response) => {
  response.send("SQLite Books API is Running!");
});

// GET all books
app.get("/books/", async (request, response) => {
  try {
    const books = await db.all("SELECT * FROM book ORDER BY id");
    response.status(200).json(books);
  } catch (error) {
    response.status(500).json({ error: "Unable to retrieve books" });
  }
});

// GET one book
app.get("/books/:bookId/", async (request, response) => {
  try {
    const book = await db.get(
      "SELECT * FROM book WHERE id = ?",
      [request.params.bookId]
    );

    if (!book) {
      return response.status(404).json({ error: "Book not found" });
    }

    response.status(200).json(book);
  } catch (error) {
    response.status(500).json({ error: "Unable to retrieve book" });
  }
});

// POST a new book
app.post("/books/", async (request, response) => {
  try {
    const { title, author, price, pages } = request.body;

    if (
      typeof title !== "string" || !title.trim() ||
      typeof author !== "string" || !author.trim() ||
      !Number.isInteger(price) || price < 0 ||
      !Number.isInteger(pages) || pages <= 0
    ) {
      return response.status(400).json({
        error: "Provide valid title, author, price, and pages",
      });
    }

    const result = await db.run(
      `INSERT INTO book (title, author, price, pages)
       VALUES (?, ?, ?, ?)`,
      [title.trim(), author.trim(), price, pages]
    );

    response.status(201).json({
      message: "Book added successfully",
      bookId: result.lastID,
    });
  } catch (error) {
    response.status(500).json({ error: "Unable to add book" });
  }
});

// PUT: Update a book
app.put("/books/:bookId/", async (request, response) => {
  try {
    const { title, author, price, pages } = request.body;

    if (
      typeof title !== "string" || !title.trim() ||
      typeof author !== "string" || !author.trim() ||
      !Number.isInteger(price) || price < 0 ||
      !Number.isInteger(pages) || pages <= 0
    ) {
      return response.status(400).json({
        error: "Provide valid title, author, price, and pages",
      });
    }

    const result = await db.run(
      `UPDATE book
       SET title = ?, author = ?, price = ?, pages = ?
       WHERE id = ?`,
      [
        title.trim(),
        author.trim(),
        price,
        pages,
        request.params.bookId,
      ]
    );

    if (result.changes === 0) {
      return response.status(404).json({ error: "Book not found" });
    }

    response.status(200).json({
      message: "Book updated successfully",
    });
  } catch (error) {
    response.status(500).json({ error: "Unable to update book" });
  }
});
// DELETE a book
app.delete("/books/:bookId/", async (request, response) => {
  try {
    const result = await db.run(
      "DELETE FROM book WHERE id = ?",
      [request.params.bookId]
    );

    if (result.changes === 0) {
      return response.status(404).json({ error: "Book not found" });
    }
    response.status(200).json({
      message: "Book deleted successfully",
    });
  } catch (error) {
    response.status(500).json({ error: "Unable to delete book" });
  }
});
initializeDBAndServer();