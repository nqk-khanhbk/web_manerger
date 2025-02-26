const deshboardRoutes = require('./deshboard.routes');
const productRoutes = require('./products.routes');
const systemConfig= require('../../config/system');
const productCategoryRoutes = require('./products-category.routes');
const rolesRoutes = require('./roles.routes');
const accountRoutes = require('./account.routes');
const authRoutes = require('./auth.routes');
const profileRoutes = require('./profile.routes');
const authMiddleware = require('../../middleware/admin/auth.middleware');
module.exports = (app)=>{
    const PATH_ADMIN = systemConfig.prefixAdmin;
    app.use(PATH_ADMIN +"/deshboard",authMiddleware.requireAuth,deshboardRoutes);
    app.use(PATH_ADMIN +"/products",authMiddleware.requireAuth,productRoutes);
    app.use(PATH_ADMIN +"/products-category",authMiddleware.requireAuth,productCategoryRoutes);
    app.use(PATH_ADMIN +"/roles",authMiddleware.requireAuth,rolesRoutes);
    app.use(PATH_ADMIN +"/account",authMiddleware.requireAuth,accountRoutes);
    app.use(PATH_ADMIN +"/auth",authRoutes);
    app.use(PATH_ADMIN +"/profile",profileRoutes);
}