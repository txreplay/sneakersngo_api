const {Router} = require('express');

const passport = require('passport');
const {setAuthentication} = require('../services/authentication.service');
setAuthentication(passport);

const {AuthRouterClass}  = require('./auth/auth.route');
const {BrandRouterClass} = require('./brand/brand.route');
const {ModelRouterClass} = require('./model/model.route');
const {SneakerRouterClass} = require('./sneaker/sneaker.route');
const {UserRouterClass} = require('./user/user.route');

const mainRouter = Router();
const apiRouter = Router();

const authRouter = new AuthRouterClass();
const brandRouter = new BrandRouterClass({passport});
const modelRouter = new ModelRouterClass({passport});
const sneakerRouter = new SneakerRouterClass({passport});
const userRouter = new UserRouterClass({passport});

mainRouter.use('/', apiRouter);
apiRouter.use('/auth', authRouter.init());
apiRouter.use('/brand', brandRouter.init());
apiRouter.use('/model', modelRouter.init());
apiRouter.use('/sneaker', sneakerRouter.init());
apiRouter.use('/user', userRouter.init());

module.exports = { mainRouter };