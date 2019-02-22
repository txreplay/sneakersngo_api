const express = require('express');
const sneakerRouter = express.Router();
const {createSneaker, getAllSneakers, getAllSneakersByModel, getOneSneaker, editOneSneaker, deleteOneSneaker} = require('./sneaker.controller');
const {gotBody, checkFields} = require('../../services/request.service');
const {sendBodyError, sendFieldsError, sendApiSuccess, sendApiError} = require('../../services/response.service');

class SneakerRouterClass {
    constructor({passport}) {
        this.passport = passport;
    }

    routes() {
        sneakerRouter.post('/', this.passport.authenticate('jwt', {session: false}), (req, res) => {
            if (gotBody(req.body)) {
                sendBodyError(res);
            }

            const {validity, extra, miss} = checkFields(['model', 'size', 'color', 'originalPrice', 'rentPrice', 'description', 'compositionExt', 'compositionOutSole'], req.body);

            if (!validity) {
                sendFieldsError(res, extra, miss);
            } else {
                createSneaker(req.body, req.user)
                    .then(apiRes => sendApiSuccess(res, apiRes, 'Model successfully created.'))
                    .catch(apiResErr => sendApiError(res, null, apiResErr));
            }
        });

        sneakerRouter.get('/', (req, res) => {
            getAllSneakers()
                .then(apiRes => sendApiSuccess(res, apiRes, 'List of sneakers.'))
                .catch(apiResErr => sendApiError(res, null, apiResErr));
        });

        sneakerRouter.get('/model/:id', (req, res) => {
            getAllSneakersByModel(req.params.id)
                .then(apiRes => sendApiSuccess(res, apiRes, 'List of sneakers by model ' + req.params.id))
                .catch(apiResErr => sendApiError(res, null, apiResErr));
        });

        sneakerRouter.get('/:id', (req, res) => {
            getOneSneaker(req.params.id, req.user)
                .then(apiRes => sendApiSuccess(res, apiRes, 'Sneaker ' + req.params.id))
                .catch(apiResErr => sendApiError(res, null, apiResErr));
        });

        sneakerRouter.delete('/:id', this.passport.authenticate('jwt', {session: false}), (req, res) => {
            deleteOneSneaker(req.params.id)
                .then(apiRes => sendApiSuccess(res, apiRes, 'Sneaker ' + req.params.id + ' successfully deleted.'))
                .catch(apiResErr => sendApiError(res, null, apiResErr));
        });
    }

    init() {
        this.routes();

        return sneakerRouter;
    }
}

module.exports = {SneakerRouterClass};
