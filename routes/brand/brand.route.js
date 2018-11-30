const express = require('express');
const brandRouter = express.Router();
const {createBrand, getAllBrands, getOneBrand, editBrand, deleteBrand} = require('./brand.controller');
const {gotBody, checkFields} = require('../../services/request.service');
const {sendBodyError, sendFieldsError, sendApiSuccess, sendApiError} = require('../../services/response.service');

class BrandRouterClass {
    constructor({passport}) {
        this.passport = passport;
    }

    routes() {
        brandRouter.post('/', this.passport.authenticate('jwt', {session: false}), (req, res) => {
            if (gotBody(req.body)) {
                sendBodyError(res);
            }

            const {validity, extra, miss} = checkFields(['test'], req.body);

            if (!validity) {
                sendFieldsError(res, extra, miss);
            } else {
                createBrand(req.body, req.user)
                    .then(apiRes => sendApiSuccess(res, apiRes, ''))
                    .catch(apiResErr => sendApiError(res, null, apiResErr));
            }
        });
    }

    init() {
        this.routes();

        return brandRouter;
    }
}

module.exports = {BrandRouterClass};