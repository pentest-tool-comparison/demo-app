const express = require('express');
const path = require('path');
const mysql = require('mysql')
const multer = require('multer');
const md5 = require('md5');
const bodyParser = require("express");

const app = express();

const port = process.env.PORT || 3000;
const backendPath = process.env.backend_path || "/api";

app.use(bodyParser.json({
    limit: '50mb'
}));

app.listen(port, () => {
    console.log(`${process.env.npm_package_name} ${process.env.npm_package_version} running...`);
    console.log(`Backend: http://localhost:${port}${backendPath}/`);
    console.log(`Frontend: http://localhost:${port}/`);
});

const storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, 'public/uploads/');
    },
    filename: function (req, file, callback) {

        const name = req.headers.filename != null ? req.headers.filename : file.originalname;
        callback(null, name);
    }
});

const upload = multer({ storage: storage});

const connection = mysql.createConnection({
    host: process.env.DB_HOST || "localhost",
    port: process.env.DB_POST || 3306,
    user: process.env.DB_USER || "demoapp",
    password: process.env.DB_PASSWORD || "12345678",
    database: process.env.DB_NAME || "demoapp",
    multipleStatements: true
});

connection.connect(function(err) {
    if (err){
        console.log(`Could not connect to MySQL Database: ${err.message}`)
        process.exit(1);
    }
    console.log(`Connected to MySQL Database on ${process.env.DB_HOST || "localhost"}:${process.env.DB_POST || 3306}`);
});

function log(req) {
    const date = new Date();
    const time = (date.getHours() < 10 ? '0' : '') + date.getHours() + ':' + (date.getMinutes() < 10 ? '0' : '') + date.getMinutes() + ':' + (date.getSeconds() < 10 ? '0' : '') + date.getSeconds();
    console.log(`${time} - ${req.method} request on ${req.originalUrl}`);
}

app.get(backendPath + '/users', async (req, res) => {
    log(req);
    res.json(await query('SELECT * FROM userdata'))
})

app.get(backendPath + '/items', async (req, res) => {
    log(req);
    res.json(await query('SELECT * FROM items'))
})

app.get(backendPath + '/item/:id', async (req, res) => {
    log(req);
    const data = await query('SELECT * FROM items WHERE item_id=' + req.params.id);
    if(data === undefined) return res.status(500).send();
    res.json(data[0]);
})

app.get(backendPath + '/item/:id/comments', async (req, res) => {
    log(req);
    res.json(await query('SELECT * FROM comments WHERE item_id=' + req.params.id));
})

app.post(backendPath + '/item/:id/comment', async (req, res) => {
    log(req);
    res.json(await query(`INSERT INTO comments (item_id, title, body) VALUES (${req.params.id}, "${req.body.title}", "${req.body.body}");`));
})

app.post(backendPath + '/items/search', async (req, res) => {
    log(req);
    res.json(await query(`SELECT * FROM items WHERE name LIKE "%${req.body.search}%";`));
})

app.post(backendPath +'/upload', upload.any(), async (req, res) => {
    log(req);
    res.status(201).send();
});

app.post(backendPath +'/user/forgot-password', async (req, res) => {
    log(req);
    const users = await query(`SELECT * FROM userdata WHERE username="${req.body.username}";`);
    const msg = users.length === 0 ? 'This user does not exist!' : 'The e-mail has been sent!'
    res.json({message: msg});
});

app.post(backendPath +'/user/login', async (req, res) => {
    log(req);
    const users = await query(`SELECT * FROM userdata WHERE username="${req.body.username}";`);
    if(users.length === 0){
        return res.json({message: "Invalid credentials!"});
    }

    if(users[0].pw_md5 !== md5(req.body.password)){
        return res.json({message: "Invalid credentials!"});
    }

    if(users[0].is_admin && !req.body.should_be_admin){
        return res.json({message: "Please use the admin form to log in!"});
    }

    if(!users[0].is_admin && req.body.should_be_admin){
        return res.json({message: "Please use the user form to log in!"});
    }

    res.json({message: "Login successful!"});
});

const sessionData = new Map();

app.post(backendPath +'/checkout', async (req, res) => {
    log(req);
    sessionData.set(req.sessionId, req.body)
    res.json({redirect: "checkout.html"});
});

app.get(backendPath +'/checkout', async (req, res) => {
    log(req);
    const data = sessionData.get(req.sessionId);
    if(data != null) return res.json(data)
    res.status(404).send();
});

app.get(backendPath + '/xss_reflected', (req, res) => {
    log(req);
    res.send('<html><body>Hello ' + req.query.name + '!</body></html>')
})


app.use(express.static(path.join(__dirname, 'public')));



async function query(sql) {
    return new Promise((resolve, reject) => {
        connection.query(sql, function (error, results) {
            if (error){
                console.log(error);
            }

            // get the data of the last sql command
            let c = 0;
            let queryOutputs = [];

            try {
                for (const result of results) {
                    if(result.constructor.name === 'RowDataPacket'){
                        c++;
                    }
                    if(result.constructor.name === 'Array'){
                        queryOutputs.push(result);
                    }
                }
            }catch (e) {
                // Is not iterable
                resolve(results);
            }

            if(results == null){
                return reject(null);
            }
            if(c === results.length){
                resolve(results);
            }else{
                resolve(queryOutputs[queryOutputs.length - 1])
            }
        });
    })
}