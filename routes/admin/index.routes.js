const deshboardRoutes = require('./deshboard.routes');
const productRoutes = require('./products.routes');
const systemConfig= require('../../config/system');
const productCategoryRoutes = require('./products-category.routes');
const rolesRoutes = require('./roles.routes');
const accountRoutes = require('./account.routes');
const authRoutes = require('./auth.routes');
module.exports = (app)=>{
    const PATH_ADMIN = systemConfig.prefixAdmin;
    app.use(PATH_ADMIN +"/deshboard",deshboardRoutes);
    app.use(PATH_ADMIN +"/products",productRoutes);
    app.use(PATH_ADMIN +"/products-category",productCategoryRoutes);
    app.use(PATH_ADMIN +"/roles",rolesRoutes);
    app.use(PATH_ADMIN +"/account",accountRoutes);
    app.use(PATH_ADMIN +"/auth",authRoutes);
}