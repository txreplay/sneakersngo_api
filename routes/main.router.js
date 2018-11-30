const {Router} = require('express');

const passport = require('passport');
const {setAuthentication} = require('../services/authentication.service');
setAuthentication(passport);

const {AuthRouterClass}  = require('./auth/auth.route');
const {BrandRouterClass} = require('./brand/brand.route');
const {ModelRouterClass} = require('./model/model.route');

const mainRouter = Router();
const apiRouter = Router();

const authRouter = new AuthRouterClass();
const brandRouter = new BrandRouterClass({passport});
const modelRouter = new ModelRouterClass({passport});

mainRouter.use('/', apiRouter);
apiRouter.use('/auth', authRouter.init());
apiRouter.use('/brand', brandRouter.init());
apiRouter.use('/model', modelRouter.init());

module.exports = { mainRouter };