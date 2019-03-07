const express = require('express');
const cartRouter = express.Router();
const {addToCart, deleteFromCart, isInCart} = require('./cart.controller');
const {gotBody, checkFields} = require('../../services/request.service');
const {sendBodyError, sendFieldsError, sendApiSuccess, sendApiError} = require('../../services/response.service');

class CartRouterClass {
    constructor({passport}) {
        this.passport = passport;
    }

    routes() {
        cartRouter.post('/', this.passport.authenticate('jwt', {session: false}), (req, res) => {
            if (gotBody(req.body)) {
                sendBodyError(res);
            }

            const {validity, extra, miss} = checkFields(['sneakerId'], req.body);

            if (!validity) {
                sendFieldsError(res, extra, miss);
            } else {
                addToCart(req.body, req.user)
                    .then(apiRes => sendApiSuccess(res, apiRes, 'Sneaker added to cart.'))
                    .catch(apiResErr => sendApiError(res, null, apiResErr));
            }
        });

        cartRouter.get('/:id', this.passport.authenticate('jwt', {session: false}), (req, res) => {
            isInCart(req.params.id, req.user)
                .then(apiRes => sendApiSuccess(res, apiRes, 'Sneaker ' + req.params.id))
                .catch(apiResErr => sendApiError(res, null, apiResErr));
        });

        cartRouter.delete('/:id', this.passport.authenticate('jwt', {session: false}), (req, res) => {
            deleteFromCart(req.params.id, req.user)
                .then(apiRes => sendApiSuccess(res, apiRes, 'Sneaker ' + req.params.id + ' successfully removed from cart.'))
                .catch(apiResErr => sendApiError(res, null, apiResErr));
        });
    }

    init() {
        this.routes();

        return cartRouter;
    }
}

module.exports = {CartRouterClass};
