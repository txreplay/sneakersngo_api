const {Router} = require('express');

const passport = require('passport');
const {setAuthentication} = require('../services/authentication.service');
setAuthentication(passport);

const {AuthRouterClass}  = require('./auth/auth.route');
const {BrandRouterClass} = require('./brand/brand.route');
const {ModelRouterClass} = require('./model/model.route');
const {SneakerRouterClass} = require('./sneaker/sneaker.route');
const {UserRouterClass} = require('./user/user.route');
const {RentRouterClass} = require('./rent/rent.route');

const mainRouter = Router();
const apiRouter = Router();

const authRouter = new AuthRouterClass();
const brandRouter = new BrandRouterClass({passport});
const modelRouter = new ModelRouterClass({passport});
const sneakerRouter = new SneakerRouterClass({passport});
const userRouter = new UserRouterClass({passport});
const rentRouter = new RentRouterClass({passport});

mainRouter.use('/', apiRouter);
apiRouter.use('/auth', authRouter.init());
apiRouter.use('/brand', brandRouter.init());
apiRouter.use('/model', modelRouter.init());
apiRouter.use('/sneaker', sneakerRouter.init());
apiRouter.use('/user', userRouter.init());
apiRouter.use('/rent', rentRouter.init());

module.exports = { mainRouter };