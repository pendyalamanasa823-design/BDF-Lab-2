
const sqlite3 = require("sqlite3");
const { open } = require("sqlite");
const path = require("path");

async function insertBooks() {
  let db;

  try {
    db = await open({
      filename: path.join(__dirname, "database", "books.db"),
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

    const result = await db.get(
      "SELECT COUNT(*) AS count FROM book"
    );

    if (result.count > 0) {
      console.log("Books already exist. No duplicates inserted.");
      return;
    }

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
      ["Zero to One", "Peter Thiel", 340, 224]
    ];

    for (const book of books) {
      await db.run(
        `INSERT INTO book (title, author, price, pages)
         VALUES (?, ?, ?, ?)`,
        book
      );
    }

    console.log("10 books inserted successfully!");

    const booksList = await db.all(
      "SELECT * FROM book ORDER BY id"
    );

    console.table(booksList);
  } catch (error) {
    console.error("Error:", error.message);
    process.exitCode = 1;
  } finally {
    if (db) {
      await db.close();
    }
  }
}

insertBooks();