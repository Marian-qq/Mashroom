import connection from './db.js';
import express from 'express';
import crypto from 'crypto';

const app = express();
const port = 3000;

const createUser = async (req, res) => {
    const uuid = crypto.randomUUID();
    const tgId = 123456789;
    const tgUuid = crypto.randomUUID();
    const name = 'Tg username';
    const coins = 10000;
    const createdAt = new Date();
    const updatedAt = createdAt;

    const sql = "INSERT INTO user (uuid, tg_id, tg_uuid, name, coins, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?)";
    await connection.query(sql, [uuid, tgId, tgUuid, name, coins, createdAt, updatedAt]);

    return res.status(201).json({ message: "note has been created" });
};

const getUser = async (req, res) => {
    const id = 1;
    const sql = "SELECT * FROM user WHERE id = ?";

    const [rows] = await connection.query(sql, [id]);

    return res.status(201).json({ content: rows[0] });
};

app.get("/", (req, res) => {
    connection
        .query('SELECT * FROM user')
        .then(data => {
            res.json(data);
        }).catch(error => {
            console.error('Error fetching users from the database: ' + error.stack);
            res.status(500).json({ error: 'Failed to fetch users' });
        });
});

app.get("/createUser", (req, res) => {
    createUser(req, res);
});

app.get("/getUser", (req, res) => {
    getUser(req, res);
});

app.listen(port, () => {
    console.log(`Server listening at port: ${port}`);
});