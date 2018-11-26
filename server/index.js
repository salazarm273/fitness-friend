const express = require('express');
const fitWorld = require('./fitworld/controller');

const app = express();

const port = 3000;
const server = "localhost";

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "*");
    next();
});
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use("/", express.static(__dirname + "/../dist/"));
app.use('/fitWorld', fitWorld);

app.listen(port);

console.log(`listening on: http://${server}:${port}`);