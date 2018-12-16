const express = require('express');
const bodyParser = require("body-parser");
const serveStatic = require('serve-static');
const routes = require('./api')
const app = express();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

routes(app);

app.use(serveStatic(__dirname + "/dist"));
const port = process.env.PORT || 3000;
app.listen(port);
console.log('server started '+ port);