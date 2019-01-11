const express = require('express');
const rentRouter = express.Router();
const {initRent, getAllRents, getOneRent, sentRent, receivedRent, sentBackRent, receivedBackRent, closedRent} = require('./rent.controller');
const {gotBody, checkFields} = require('../../services/request.service');
const {sendBodyError, sendFieldsError, sendApiSuccess, sendApiError} = require('../../services/response.service');

class RentRouterClass {
    constructor({passport}) {
        this.passport = passport;
    }

    routes() {
        rentRouter.post('/', this.passport.authenticate('jwt', {session: false}), (req, res) => {
            if (gotBody(req.body)) {
                sendBodyError(res);
            }

            const {validity, extra, miss} = checkFields(['sneaker', 'duration'], req.body);

            if (!validity) {
                sendFieldsError(res, extra, miss);
            } else {
                initRent(req.body, req.user)
                    .then(apiRes => sendApiSuccess(res, apiRes, 'Rent successfully created.'))
                    .catch(apiResErr => sendApiError(res, null, apiResErr));
            }
        });

        rentRouter.get('/', this.passport.authenticate('jwt', {session: false}), (req, res) => {
            getAllRents()
                .then(apiRes => sendApiSuccess(res, apiRes, 'List of rents.'))
                .catch(apiResErr => sendApiError(res, null, apiResErr));
        });

        rentRouter.get('/:id', this.passport.authenticate('jwt', {session: false}), (req, res) => {
            getOneRent(req.params.id)
                .then(apiRes => sendApiSuccess(res, apiRes, 'Rent ' + req.params.id))
                .catch(apiResErr => sendApiError(res, null, apiResErr));
        });

        rentRouter.patch('/:id/status/sent', this.passport.authenticate('jwt', {session: false}), (req, res) => {
            sentRent(req.params.id)
                .then(apiRes => sendApiSuccess(res, apiRes, 'Rent ' + req.params.id))
                .catch(apiResErr => sendApiError(res, null, apiResErr));
        });

        rentRouter.patch('/:id/status/received', this.passport.authenticate('jwt', {session: false}), (req, res) => {
            receivedRent(req.params.id)
                .then(apiRes => sendApiSuccess(res, apiRes, 'Rent ' + req.params.id))
                .catch(apiResErr => sendApiError(res, null, apiResErr));
        });

        rentRouter.patch('/:id/status/sentBack', this.passport.authenticate('jwt', {session: false}), (req, res) => {
            sentBackRent(req.params.id)
                .then(apiRes => sendApiSuccess(res, apiRes, 'Rent ' + req.params.id))
                .catch(apiResErr => sendApiError(res, null, apiResErr));
        });

        rentRouter.patch('/:id/status/receivedBack', this.passport.authenticate('jwt', {session: false}), (req, res) => {
            receivedBackRent(req.params.id)
                .then(apiRes => sendApiSuccess(res, apiRes, 'Rent ' + req.params.id))
                .catch(apiResErr => sendApiError(res, null, apiResErr));
        });

        rentRouter.patch('/:id/status/closed', this.passport.authenticate('jwt', {session: false}), (req, res) => {
            closedRent(req.params.id)
                .then(apiRes => sendApiSuccess(res, apiRes, 'Rent ' + req.params.id))
                .catch(apiResErr => sendApiError(res, null, apiResErr));
        });
    }

    init() {
        this.routes();

        return rentRouter;
    }
}

module.exports = {RentRouterClass};