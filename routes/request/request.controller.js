const RequestModel = require('../../models/request.model');

const createRequest = (body, user) => {
    return new Promise(async (resolve, reject) => {
        try {
            body.createdBy = user._id;

            RequestModel.create(body)
                .then((mongoRes) => resolve(mongoRes))
                .catch((mongoResErr) => reject(mongoResErr));
        } catch (e) {
            reject(e);
        }
    });
};

const getAllRequests = () => {
    return new Promise((resolve, reject) => {
        RequestModel.find({}, (error, sneakers) => {
            return (error) ? reject(error) : resolve(sneakers);
        });
    });
};

const getOneRequest = (requestId) => {
    return new Promise((resolve, reject) => {
        RequestModel.findById(requestId, (error, sneaker) => {
            return (error) ? reject(error) : resolve(sneaker);
        });
    });
};

module.exports = {createRequest, getAllRequests, getOneRequest};
