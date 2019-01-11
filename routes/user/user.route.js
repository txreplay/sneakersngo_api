const express = require('express');
const userRouter = express.Router();
const {updateProfile} = require('./user.controller');
const {gotBody, checkFields} = require('../../services/request.service');
const {sendBodyError, sendFieldsError, sendApiSuccess, sendApiError} = require('../../services/response.service');

class UserRouterClass {
    constructor({passport}) {
        this.passport = passport;
    }

    routes() {
        userRouter.patch('/', this.passport.authenticate('jwt', {session: false}), (req, res) => {
            if (gotBody(req.body)) {
                sendBodyError(res);
            }

            const {validity, extra, miss} = checkFields(['firstname', 'lastname', 'phone', 'address'], req.body);

            if (!validity) {
                sendFieldsError(res, extra, miss);
            } else {
                updateProfile(req.body, req.user)
                    .then(apiRes => sendApiSuccess(res, apiRes, 'User successfully updated.'))
                    .catch(apiResErr => sendApiError(res, null, apiResErr));
            }
        });
    }

    init() {
        this.routes();

        return userRouter;
    }
}

module.exports = {UserRouterClass};
