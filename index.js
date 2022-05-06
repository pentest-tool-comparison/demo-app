const express = require('express');
const path = require('path');
const mysql = require('mysql')
const multer = require('multer');
const md5 = require('md5');

const app = express();
const bodyParser = require('body-parser');
const port = process.env.PORT || 3000;
const backendPath = process.env.backend_path || "/api";

app.use(bodyParser.json({
    limit: '50mb'
}));

app.listen(port, () => console.log(`${process.env.npm_package_name} ${process.env.npm_package_version} running on http://localhost:${port}${backendPath}`));

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
    host: "localhost",
    user: "demoapp",
    password: "12345678",
    database: "demoapp",
    multipleStatements: true
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

app.get(backendPath + '/item/:id', async (req, res) => {
    const data = await query('SELECT * FROM items WHERE item_id=' + req.params.id);
    res.json(data[0]);
})

app.get(backendPath + '/item/:id/comments', async (req, res) => {
    res.json(await query('SELECT * FROM comments WHERE item_id=' + req.params.id));
})

app.post(backendPath + '/item/:id/comment', async (req, res) => {
    res.json(await query(`INSERT INTO comments (item_id, title, body) VALUES (${req.params.id}, "${req.body.title}", "${req.body.body}");`));
})

app.post(backendPath + '/items/search', async (req, res) => {
    res.json(await query(`SELECT * FROM items WHERE name LIKE "%${req.body.search}%";`));
})

app.post(backendPath +'/upload', upload.any(), async (req, res) => {
    res.status(201).send();
});

app.post(backendPath +'/user/forgot-password', async (req, res) => {
    const users = await query('SELECT * FROM userdata WHERE username="' + req.body.username + '";');
    const msg = users.length === 0 ? 'The user does not exist' : 'The e-mail has been sent.'
    res.json({message: msg});
});

app.post(backendPath +'/user/login', async (req, res) => {
    const users = await query(`SELECT * FROM userdata WHERE username="${req.body.username}";`);
    if(users.length === 0){
        return res.json({message: "Invalid credentials!"});
    }

    if(users[0].pw_md5 !== md5(req.body.password)){
        return res.json({message: "Invalid credentials!"});
    }

    res.json({message: "Login successful!"});
});


app.use(express.static(path.join(__dirname, 'public')));



async function query(sql) {
    return new Promise((resolve, reject) => {
        connection.query(sql, function (error, results) {
            if (error) console.log(error);

            let c = 0;
            let queryOutputs = [];

            for (const result of results) {
                if(result.constructor.name === 'RowDataPacket'){
                    c++;
                }
                if(result.constructor.name === 'Array'){
                    queryOutputs.push(result);
                }
            }

            if(c === results.length){
                resolve(results)
            }else{
                resolve(queryOutputs[queryOutputs.length - 1])
            }
        });
    })
}