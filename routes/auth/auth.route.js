const express = require('express');
const authRouter = express.Router();
const {register, login} = require('./auth.controller');
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
                register(req.body).then((apiResponse) => {
                    sendApiSuccess(res, apiResponse, 'User successfully created.');
                }).catch((apiResponseErr) => {
                    sendApiError(res, null, apiResponseErr);
                });
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
                login(req.body).then((apiResponse) => {
                    sendApiSuccess(res, apiResponse, 'User successfully logged.');
                }).catch((apiResponseErr) => {
                    sendApiError(res, null, apiResponseErr);
                });
            }
        });
    }

    init() {
        this.routes();

        return authRouter;
    }
}

module.exports = {AuthRouterClass};