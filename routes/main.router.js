const {Router}          = require('express');
const {AuthRouterClass} = require('./auth/auth.route');

const mainRouter = Router();
const apiRouter = Router();

const authRouter = new AuthRouterClass();

mainRouter.use('/', apiRouter);
apiRouter.use('/auth', authRouter.init());

module.exports = { mainRouter };