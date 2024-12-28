const express = require('express');
const cookieParser = require('cookie-parser');
const session = require('express-session');
var methodOverride = require('method-override')
var bodyParser = require('body-parser');
const app = express();
const database = require('./config/database.js');
const flash = require('express-flash');
//cấu hình env
require('dotenv').config()

const port = process.env.PORT;
const route = require('./routes/client/index.routes');
const routeAdmin = require('./routes/admin/index.routes')

const systemConfig = require('./config/system.js');
//kết nối vs database
database.connect();
//end connect database

//method-override
app.use(methodOverride('_method'))

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

app.set('views', './view');
app.set('view engine', 'pug');

//nhúng file public tĩnh
app.use(express.static("public"));


// cấu hình tính năng hiển thị thông báo
app.use(cookieParser("jdkkske"));
app.use(session({ cookie: { maxAge: 60000 }}));
app.use(flash());


//Routes
route(app);
routeAdmin(app);

//App local variable
app.locals.prefixAdmin = systemConfig.prefixAdmin;






app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})