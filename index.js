const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const session = require('express-session');
var methodOverride = require('method-override')
var bodyParser = require('body-parser');
const app = express();
const database = require('./config/database.js');
const flash = require('express-flash');
const moment = require('moment');
//cấu hình env
require('dotenv').config()

const port = process.env.PORT;


// gọi đến roure 
const route = require('./routes/client/index.routes');
const routeAdmin = require('./routes/admin/index.routes')

// gọi tên biến /admin trong system
const systemConfig = require('./config/system.js');

//kết nối vs database
database.connect();
//end connect database

//method-override
app.use(methodOverride('_method'))

//Socket IO
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
global._io = io

//End Socket

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

app.set('views', `${__dirname}/view`);
app.set('view engine', 'pug');

//nhúng file public tĩnh
app.use(express.static(`${__dirname}/public`));


// cấu hình tính năng hiển thị thông báo
app.use(cookieParser("jdkkske"));
app.use(session({ cookie: { maxAge: 60000 }}));
app.use(flash());

//cấu hình Tinymce
app.use('/tinymce', express.static(path.join(__dirname, 'node_modules', 'tinymce')));

//Routes
route(app);
routeAdmin(app);

//App local variable(để có thể để ở bất cứ đâu trong pj) ở đâu cần dùng đến thì dùng prefixAdmin(chỉ dùng trong file pug)
app.locals.prefixAdmin = systemConfig.prefixAdmin;
app.locals.moment = moment;

// nếu truy cập sai link sẽ vào trang lỗi 404
app.get("*",(req,res) =>{
  res.render("client/pages/errors/404",{
  pageTitle : "404 Not Found",
});
});

//đổi app thành server khi cài cấu hình socketIo
server.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})