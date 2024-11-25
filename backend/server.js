require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());
const port = 8001;

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
});

db.connect((err) => {
    if (err) {
      console.error('Database connection failed: ' + err.stack);
      return;
    }
    console.log('Connected to database');
});

app.get('/api/v1/folders', (req, res) => {
    const query = 'SELECT * FROM folders ORDER BY name ASC';
    db.query(query, (err, results) => {
      if (err) {
        console.error(err);
        res.status(500).send('Error retrieving folders');
        return;
      }
      res.json(results);
    });
});

app.get('/api/v1/sub_folders/:folderId', (req, res) => {
    const folderId = req.params.folderId;
    const query = 'SELECT * FROM sub_folders WHERE folder_id = ?';
    db.query(query, [folderId], (err, results) => {
        if (err) {
        console.error(err);
        res.status(500).send('Error retrieving sub folders');
        return;
        }
        res.json(results);
    });
});

app.get('/api/v1/files/:subFolderId', (req, res) => {
    const folderId = req.params.folderId;
    const query = 'SELECT * FROM files WHERE sub_folder_id = ?';
    db.query(query, [folderId], (err, results) => {
        if (err) {
        console.error(err);
        res.status(500).send('Error retrieving files');
        return;
        }
        res.json(results);
    });
});
  
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});