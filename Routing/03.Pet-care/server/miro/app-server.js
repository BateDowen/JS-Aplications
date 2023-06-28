const express = require('express');
const routes = require('../miro/routes/router')
const app = express();

app.use(express.json())
app.use(routes);

const port = 3030;

app.listen(port, console.log(`App is listening on ${port}`));
