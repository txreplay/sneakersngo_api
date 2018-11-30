const express = require('express');
const modelRouter = express.Router();
const {createModel, getAllModels, getOneModel, editModel, deleteModel} = require('./model.controller');
const {gotBody, checkFields} = require('../../services/request.service');
const {sendBodyError, sendFieldsError, sendApiSuccess, sendApiError} = require('../../services/response.service');

class ModelRouterClass {
    constructor({passport}) {
        this.passport = passport;
    }

    routes() {
        modelRouter.post('/', this.passport.authenticate('jwt', {session: false}), (req, res) => {
            if (gotBody(req.body)) {
                sendBodyError(res);
            }

            const {validity, extra, miss} = checkFields(['names', 'brand'], req.body);

            if (!validity) {
                sendFieldsError(res, extra, miss);
            } else {
                createModel(req.body, req.user)
                    .then(apiRes => sendApiSuccess(res, apiRes, 'Model successfully created.'))
                    .catch(apiResErr => sendApiError(res, null, apiResErr));
            }
        });

        modelRouter.get('/', this.passport.authenticate('jwt', {session: false}), (req, res) => {
            getAllModels()
                .then(apiRes => sendApiSuccess(res, apiRes, 'List of models.'))
                .catch(apiResErr => sendApiError(res, null, apiResErr));
        });

        modelRouter.get('/:id', this.passport.authenticate('jwt', {session: false}), (req, res) => {
            getOneModel(req.params.id)
                .then(apiRes => sendApiSuccess(res, apiRes, 'Model ' + req.params.id))
                .catch(apiResErr => sendApiError(res, null, apiResErr));
        });
    }

    init() {
        this.routes();

        return modelRouter;
    }
}

module.exports = {ModelRouterClass};