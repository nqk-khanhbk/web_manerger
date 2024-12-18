const express = require('express');
const app = express();
const database = require('./config/database.js');
//cấu hình env
require('dotenv').config()

const port = process.env.PORT;
const route = require('./routes/client/index.routes');
const routeAdmin = require('./routes/admin/index.routes')

const systemConfig = require('./config/system.js');
//kết nối vs database
database.connect();
//end connect database


app.set('views', './view');
app.set('view engine', 'pug');

//nhúng file public tĩnh
app.use(express.static("public"));

//Routes
route(app);
routeAdmin(app);

//App local variable
app.locals.prefixAdmin = systemConfig.prefixAdmin;

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})