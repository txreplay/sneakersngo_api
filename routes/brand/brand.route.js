const express = require('express');
const brandRouter = express.Router();
const {createBrand, getAllBrands, getOneBrand, editOneBrand, deleteOneBrand} = require('./brand.controller');
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

            const {validity, extra, miss} = checkFields(['names'], req.body);

            if (!validity) {
                sendFieldsError(res, extra, miss);
            } else {
                createBrand(req.body, req.user)
                    .then(apiRes => sendApiSuccess(res, apiRes, 'Brand successfully created.'))
                    .catch(apiResErr => sendApiError(res, null, apiResErr));
            }
        });

        brandRouter.get('/', this.passport.authenticate('jwt', {session: false}), (req, res) => {
            getAllBrands()
                .then(apiRes => sendApiSuccess(res, apiRes, 'List of brands.'))
                .catch(apiResErr => sendApiError(res, null, apiResErr));
        });

        brandRouter.get('/:id', this.passport.authenticate('jwt', {session: false}), (req, res) => {
            getOneBrand(req.params.id)
                .then(apiRes => sendApiSuccess(res, apiRes, 'Brand ' + req.params.id))
                .catch(apiResErr => sendApiError(res, null, apiResErr));
        });

        brandRouter.delete('/:id', this.passport.authenticate('jwt', {session: false}), (req, res) => {
            deleteOneBrand(req.params.id)
                .then(apiRes => sendApiSuccess(res, apiRes, 'Brand ' + req.params.id + ' successfully deleted.'))
                .catch(apiResErr => sendApiError(res, null, apiResErr));
        });
    }

    init() {
        this.routes();

        return brandRouter;
    }
}

module.exports = {BrandRouterClass};