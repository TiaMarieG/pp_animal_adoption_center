const express = require('express');
const mariadb = require('mariadb');

const app = express();
const PORT = 3000;

const pool = mariadb.createPool({
    host: 'localhost',
    user: 'root',
    password: 'Izzaia8192',
    database: 'pets'
});

//Creating an async function called connect
async function connect() {
    try {
        // Await means that code won't execute until it the connection succeeds or fails
        const conn = await pool.getConnection();
        console.log('Connected to the database');
        return conn;
    } catch(err) {
        console.log('Error connecting to DB: ' + err);
    }
}

app.use(express.urlencoded({ extended : false}));
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    console.log("Hello, world - server!")
    res.render('home');
});

app.get('/adoptions', async (req, res) => {
    const conn = await connect();
    const results = await conn.query
        ('SELECT * FROM adoptions ORDER BY date_submitted DESC');

    res.render('adoptions', {adoptions : results});
});

app.post('/submit', async (req, res) => {
    const data = req.body;
    console.log(data);

    // Connect to the database
    const conn = await connect();

    await conn.query(
        `INSERT INTO adoptions (pet_type, quantity, color) VALUES ('${data.pet_type}', '${data.pet_quantity}', '${data.pet_color}')`);

    res.render('confirm', {details : data});
});

app.listen(PORT, () => {
    console.log (`Server running on port http://localhost:${PORT}`)
});