const productRoures = require('./products.routes');
const homeRoutes = require('./home.routes');
const categoryMiddleware = require('../../middleware/client/category.middleware');
const cartMiddleware = require('../../middleware/client/cart.middleware');
const searchRoutes = require('./search.routes');
const cartRoutes = require('./cart.routes');
const checkOutRoutes = require('./checkout.routes');
const userRoutes = require('./user.routes');
const userMiddleware = require('../../middleware/client/user.middleware')
module.exports = (app) =>{
    app.use(categoryMiddleware.category)
    app.use(userMiddleware.infoUser)
    app.use(cartMiddleware.cartId)
    app.use('/', homeRoutes)  
    app.use('/products', productRoures);
    app.use('/search', searchRoutes);
    app.use('/cart',cartRoutes);
    app.use('/checkout',checkOutRoutes);
    app.use('/user',userRoutes);
}