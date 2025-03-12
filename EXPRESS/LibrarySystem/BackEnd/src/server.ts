import express, { Request, Response, NextFunction } from "express"
import dotenv from 'dotenv'
import { readFileSync } from "fs"
import path from 'path'
import cors from "cors"
import pool from "./db/db"

//1:configure the dotenv 
//top most level
dotenv.config()

//2:instance of express
//the second most top level
const app = express()

//3:load the variables
const port = process.env.PORT
const secret = process.env.SECRET



//4: enable middlewares 
//this will enable stringying to json
app.use(express.json())
app.use(express.urlencoded({ extended: true }))// for parsing application/x-www-form-urlencoded



app.use(cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true //allows cookies and auth headers
}))
//4: enable middlewares 
//this will enable stringying to json
app.use(express.json())
app.use(express.urlencoded({ extended: true }))// for parsing application/x-www-form-urlencoded



//Test route
app.get("/", (req: Request, res: Response) => {
    res.send("Hello, Welcome to the Book Posting API!");
});

//Create User
app.post("/api/register", async (req: Request, res: Response) => {
    const { name, email, password } = req.body;

    try {
        // Ensure role is borrower (only borrowers can register)
        const roleResult = await pool.query("SELECT id FROM user_role WHERE role_name = 'Borrower'");
        if (roleResult.rows.length === 0) {
            res.status(400).json({ error: "Role not found!" });
            return
        }
        const borrowerRoleId = roleResult.rows[0].id;

        // Insert new user
        await pool.query(
            "INSERT INTO users (name, email, password, role_id) VALUES ($1, $2, $3, $4)",
            [name, email, password, borrowerRoleId] // Corrected order
        );

        res.json({ message: "Registration successful!" });
    } catch (err) {
        res.status(500).json({ error: "Database error" });
    }
});

//modify User Data
app.patch("/api/register/:id", async (req: Request, res: Response) => {
    const { id } = req.params; // Get user ID from URL
    const { name, email, password } = req.body;

    try {
        // Check if the user exists
        const userResult = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
        if (userResult.rows.length === 0) {
             res.status(404).json({ error: "User not found!" });
             return
        }

        // Update user details
        await pool.query(
            "UPDATE users SET name = $1, email = $2, password = $3 WHERE id = $4",
            [name, email, password, id]
        );

        res.json({ message: "User updated successfully!" });

    } catch (err) {
        res.status(500).json({ error: "Database error" })
    }
});

 
// 🟢 User Login
app.post("/api/login", async (req:Request, res:Response) => {
    const { name, password } = req.body;

    try {
        // Find user
        const userResult = await pool.query(
            `SELECT users.id, users.name, users.password, user_role.role_name 
             FROM users JOIN user_role ON users.role_id = user_role.id 
             WHERE users.name = $1`, 
            [name]
        );

        if (userResult.rows.length === 0) {
            res.status(400).json({ error: "User not found!" });
            return 
        }

        const user = userResult.rows[0];

        // Check password (for simplicity, using plain text)
        if (user.password !== password) {
            res.status(400).json({ error: "Incorrect password!" });
            return 
        }

        res.json({ message: "Login successful!", user });

    } catch (err) {
        res.status(500).json({ error: "Database error" });
    }
});
app.get("/api/books", async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM books");
        res.json(result.rows);
    } catch (err) {
       
        res.status(500).json({ error: "Server error" });
    }
});

// ✅ Add a book
app.post("/api/books", async (req: Request, res: Response) => {
    try {
        const { title, author, genre, year, pages, publisher, description, price, added_by } = req.body;

        if (!title || !author || !year || !genre || !added_by) {
             res.status(400).json({ error: "Missing required fields!" });
             return
        }

        // ✅ Ensure valid numbers before inserting into the database
        const yearInt = Number.isInteger(Number(year)) ? Number(year) : null;
        const pagesInt = pages && Number.isInteger(Number(pages)) ? Number(pages) : null;
        const priceFloat = price && !isNaN(Number(price)) ? Number(price) : null;
        const addedByInt = Number.isInteger(Number(added_by)) ? Number(added_by) : null;

        // 🔥 Check if any required numeric fields are still null
        if (yearInt === null || addedByInt === null) {
            res.status(400).json({ error: "Invalid data format!" });
            return
        }

        // ✅ Insert into PostgreSQL
        await pool.query(
            `INSERT INTO books (title, author, genre, year, pages, publisher, description, price, added_by) 
             VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`,
            [title, author, genre, yearInt, pagesInt, publisher, description, priceFloat, addedByInt]
        );

        res.json({ message: "Book added successfully!" });
    } catch (error) {
        console.error("Error adding book:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});
// ✅ Update a book
app.patch("/api/books/:id", async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { title, author, genre, year, pages, publisher, description, price } = req.body;

        // Ensure ID is valid
        const bookId = parseInt(id, 10);
        if (isNaN(bookId)) {
            res.status(400).json({ error: "Invalid book ID" });
            return
        }

        // Prepare the fields to update dynamically
        const updates = [];
        const values = [];
        let index = 1;

        if (title) { updates.push(`title = $${index++}`); values.push(title); }
        if (author) { updates.push(`author = $${index++}`); values.push(author); }
        if (genre) { updates.push(`genre = $${index++}`); values.push(genre); }
        if (year) { updates.push(`year = $${index++}`); values.push(parseInt(year, 10)); }
        if (pages) { updates.push(`pages = $${index++}`); values.push(parseInt(pages, 10)); }
        if (publisher) { updates.push(`publisher = $${index++}`); values.push(publisher); }
        if (description) { updates.push(`description = $${index++}`); values.push(description); }
        if (price) { updates.push(`price = $${index++}`); values.push(parseFloat(price)); }

        if (updates.length === 0) {
            res.status(400).json({ error: "No valid fields to update" });
            return
        }

        values.push(bookId);
        const query = `UPDATE books SET ${updates.join(", ")} WHERE id = $${index} RETURNING *`;

        // Execute the update query
        const result = await pool.query(query, values);

        if (result.rowCount === 0) {
             res.status(404).json({ error: "Book not found" });
             return
        }

        res.json({ message: "Book updated successfully!", updatedBook: result.rows[0] });
    } catch (error) {
        console.error("Error updating book:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

app.delete("/api/books/:id", async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        // Ensure ID is a valid number
        const bookId = parseInt(id, 10);
        if (isNaN(bookId)) {
             res.status(400).json({ error: "Invalid book ID" });
             return
        }

        // Delete the book from the database
        const result = await pool.query("DELETE FROM books WHERE id = $1 RETURNING *", [bookId]);

        // If no book was deleted, it means the ID does not exist
        if (result.rowCount === 0) {
            res.status(404).json({ error: "Book not found" });
            return 
        }

        res.json({ message: "Book deleted successfully!", deletedBook: result.rows[0] });
    } catch (error) {
        console.error("Error deleting book:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});


// Start server
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});


//SOC - separtion of concern
