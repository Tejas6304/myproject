const express = require('express');
const cors = require('cors');
const { Client } = require('pg');

const app = express();
const port = 5001;

// PostgreSQL database configuration
const client = new Client({
    host: 'localhost',
    user: 'postgres',
    port: 5432,
    password: '6302', // Enter your PostgreSQL password here
    database: 'sql_app' // Enter your database name here
});

// Connect to PostgreSQL database
client.connect()
    .then(() => console.log('Connected to PostgreSQL database'))
    .catch(err => console.error('Error connecting to PostgreSQL database:', err));

// Middleware
app.use(cors());

// Route for the root endpoint
app.get('/', (req, res) => {
    res.send('Welcome to the API. Use /customers to fetch customer data.');
});

// Route to fetch customer data
app.get('/customers', async (req, res) => {
    try {
        const query = 'SELECT * FROM customers'; // Change query as per your database schema
        const { rows } = await client.query(query);
        res.json(rows);
    } catch (error) {
        console.error('Error executing query:', error);
        res.status(500).send('Error executing query');
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});
