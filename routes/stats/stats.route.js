const express = require('express');
const statsRouter = express.Router();
const {getUsersStats, getRentsStats} = require('./stats.controller');
const {gotBody, checkFields} = require('../../services/request.service');
const {sendBodyError, sendFieldsError, sendApiSuccess, sendApiError} = require('../../services/response.service');

class StatsRouterClass {
    constructor({passport}) {
        this.passport = passport;
    }

    routes() {
        statsRouter.get('/users', this.passport.authenticate('jwt', {session: false}), (req, res) => {
            getUsersStats()
                .then(apiRes => sendApiSuccess(res, apiRes, 'User stats'))
                .catch(apiResErr => sendApiError(res, null, apiResErr));
        });

        statsRouter.get('/rents', this.passport.authenticate('jwt', {session: false}), (req, res) => {
            getRentsStats()
                .then(apiRes => sendApiSuccess(res, apiRes, 'User stats'))
                .catch(apiResErr => sendApiError(res, null, apiResErr));
        });
    }

    init() {
        this.routes();

        return statsRouter;
    }
}

module.exports = {StatsRouterClass};
