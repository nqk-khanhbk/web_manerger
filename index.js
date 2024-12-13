const express = require('express');
const app = express();

//cấu hình env
require('dotenv').config()

const port = process.env.PORT;
const route = require('./routes/client/index.routes');

app.set('views', './view');
app.set('view engine', 'pug');

//nhúng file public tĩnh
app.use(express.static("public"));
//Routes
route(app);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})