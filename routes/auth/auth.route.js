const express = require('express');
const authRouter = express.Router();
const {register, login, confirmation} = require('./auth.controller');
const {gotBody, checkFields} = require('../../services/request.service');
const {sendBodyError, sendFieldsError, sendApiSuccess, sendApiError} = require('../../services/response.service');

class AuthRouterClass {
    routes() {
        authRouter.post('/register', (req, res) => {
            if (gotBody(req.body)) {
                sendBodyError(res);
            }

            const {validity, extra, miss} = checkFields(['email', 'firstname', 'lastname', 'password'], req.body);

            if (!validity) {
                sendFieldsError(res, extra, miss);
            } else {
                register(req.body)
                    .then(apiRes => sendApiSuccess(res, apiRes, 'User successfully created.'))
                    .catch(apiResErr => sendApiError(res, null, apiResErr));
            }
        });

        authRouter.post('/login', (req, res) => {
            if (gotBody(req.body)) {
                sendBodyError(res);
            }

            const {validity, extra, miss} = checkFields(['email', 'password'], req.body);

            if (!validity) {
                sendFieldsError(res, extra, miss);
            } else {
                login(req.body)
                    .then(apiRes => sendApiSuccess(res, apiRes, 'User successfully logged.'))
                    .catch(apiResErr => sendApiError(res, null, apiResErr));
            }
        });

        authRouter.get('/confirmation/:confirmationHash', (req, res) => {
            if (gotBody(req.params)) {
                sendBodyError(res);
            }

            const {validity, extra, miss} = checkFields(['confirmationHash'], req.params);

            if (!validity) {
                sendFieldsError(res, extra, miss);
            } else {
                confirmation(req.params)
                    .then(apiRes => sendApiSuccess(res, apiRes, 'User successfully confirmed.'))
                    .catch(apiResErr => sendApiError(res, null, apiResErr));
            }
        });
    }

    init() {
        this.routes();

        return authRouter;
    }
}

module.exports = {AuthRouterClass};