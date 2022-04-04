const express = require('express');
const path = require('path');
const mysql = require('mysql')

const app = express();
const port = process.env.PORT || 3000;
const backendPath = process.env.backend_path || "/api";

app.listen(port, () => console.log(`${process.env.npm_package_name} ${process.env.npm_package_version} running on http://localhost:${port}${backendPath}`));

const connection = mysql.createConnection({
    host: "localhost",
    user: "demoapp",
    password: "12345678",
    database: "demoapp"
});

connection.connect(function(err) {
    if (err) throw err;
    console.log("Connected to MySQL Database!");
});

app.get(backendPath + '/', (req, res) => {
    res.send("Hello")
})

app.get(backendPath + '/users', async (req, res) => {
    res.json(await query('SELECT * FROM userdata'))
})

app.get(backendPath + '/items', async (req, res) => {
    res.json(await query('SELECT * FROM items'))
})

app.use(express.static(path.join(__dirname, 'public')));



async function query(sql) {
    return new Promise((resolve, reject) => {
        connection.query(sql, function (error, results) {
            if (error) throw reject(error);
            resolve(results)
        });
    })
}