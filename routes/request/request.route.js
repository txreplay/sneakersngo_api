const express = require('express');
const requestRouter = express.Router();
const {createRequest, getAllRequests, getOneRequest} = require('./request.controller');
const {gotBody, checkFields} = require('../../services/request.service');
const {sendBodyError, sendFieldsError, sendApiSuccess, sendApiError} = require('../../services/response.service');

class RequestRouterClass {
    constructor({passport}) {
        this.passport = passport;
    }

    routes() {
        requestRouter.post('/', this.passport.authenticate('jwt', {session: false}), (req, res) => {
            if (gotBody(req.body)) {
                sendBodyError(res);
            }

            const {validity, extra, miss} = checkFields(['brand', 'model', 'color', 'size', 'beginDate', 'endDate'], req.body);

            if (!validity) {
                sendFieldsError(res, extra, miss);
            } else {
                createRequest(req.body, req.user)
                    .then(apiRes => sendApiSuccess(res, apiRes, 'Request successfully created.'))
                    .catch(apiResErr => sendApiError(res, null, apiResErr));
            }
        });

        requestRouter.get('/', this.passport.authenticate('jwt', {session: false}), (req, res) => {
            getAllRequests()
                .then(apiRes => sendApiSuccess(res, apiRes, 'List of requests.'))
                .catch(apiResErr => sendApiError(res, null, apiResErr));
        });

        requestRouter.get('/:id', this.passport.authenticate('jwt', {session: false}), (req, res) => {
            getOneRequest(req.params.id)
                .then(apiRes => sendApiSuccess(res, apiRes, 'Request ' + req.params.id))
                .catch(apiResErr => sendApiError(res, null, apiResErr));
        });
    }

    init() {
        this.routes();

        return requestRouter;
    }
}

module.exports = {RequestRouterClass};
