const deshboardRoutes = require('./deshboard.routes');
const systemConfig= require('../../config/system');
module.exports = (app)=>{
    const PATH_ADMIN = systemConfig.prefixAdmin;
    app.use(PATH_ADMIN +"/deshboard",deshboardRoutes);
}