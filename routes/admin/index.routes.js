const deshboardRoutes = require('./deshboard.routes');
const productRoutes = require('./products.routes');
const systemConfig= require('../../config/system');
module.exports = (app)=>{
    const PATH_ADMIN = systemConfig.prefixAdmin;
    app.use(PATH_ADMIN +"/deshboard",deshboardRoutes);
    app.use(PATH_ADMIN +"/products",productRoutes);
}