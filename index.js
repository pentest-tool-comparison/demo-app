const express = require('express');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;
const backendPath = process.env.backend_path || "/api";

app.listen(port, () => console.log(`${process.env.npm_package_name} ${process.env.npm_package_version} running on http://localhost:${port}${backendPath}`));


app.get(backendPath + '/', (req, res) => {
    res.send("Hello")
})

app.use(express.static(path.join(__dirname, 'public')));