const express = require('express');
const wishlistRouter = express.Router();
const {addToWishlist, deleteFromWishlist} = require('./wishlist.controller');
const {gotBody, checkFields} = require('../../services/request.service');
const {sendBodyError, sendFieldsError, sendApiSuccess, sendApiError} = require('../../services/response.service');

class WishlistRouterClass {
    constructor({passport}) {
        this.passport = passport;
    }

    routes() {
        wishlistRouter.post('/', this.passport.authenticate('jwt', {session: false}), (req, res) => {
            if (gotBody(req.body)) {
                sendBodyError(res);
            }

            const {validity, extra, miss} = checkFields(['sneakerId'], req.body);

            if (!validity) {
                sendFieldsError(res, extra, miss);
            } else {
                addToWishlist(req.body, req.user)
                    .then(apiRes => sendApiSuccess(res, apiRes, 'Sneaker added to wishlist.'))
                    .catch(apiResErr => sendApiError(res, null, apiResErr));
            }
        });


        wishlistRouter.delete('/:id', this.passport.authenticate('jwt', {session: false}), (req, res) => {
            deleteFromWishlist(req.params.id, req.user)
                .then(apiRes => sendApiSuccess(res, apiRes, 'Sneaker ' + req.params.id + ' successfully removed from favorites.'))
                .catch(apiResErr => sendApiError(res, null, apiResErr));
        });
    }

    init() {
        this.routes();

        return wishlistRouter;
    }
}

module.exports = {WishlistRouterClass};
