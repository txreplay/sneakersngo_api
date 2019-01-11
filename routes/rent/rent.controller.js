const RentModel = require('../../models/rent.model');

const STATUS_INIT = 'INIT';
const STATUS_SENT = 'SENT';
const STATUS_RECEIVED = 'RECEIVED';
const STATUS_SENT_BACK = 'SENT_BACK';
const STATUS_RECEIVED_BACK = 'RECEIVED_BACK';
const STATUS_CLOSED = 'CLOSED';

const initRent = (body, user) => {
    return new Promise(async (resolve, reject) => {
        try {
            body.user = String(user._id);
            body.status = STATUS_INIT;

            RentModel.create(body)
                .then((mongoRes) => resolve(mongoRes))
                .catch((mongoResErr) => reject(mongoResErr));
        } catch (e) {
            reject(e);
        }
    });
};

const sentRent = (rentId) => {
    return new Promise(async (resolve, reject) => {
        try {
            RentModel.updateOne({_id: rentId}, {$set: {status: STATUS_SENT}})
                .then((mongoRes) => resolve(mongoRes))
                .catch((mongoResErr) => reject(mongoResErr));
        } catch (e) {
            reject(e);
        }
    });
};

const receivedRent = (rentId) => {
    return new Promise(async (resolve, reject) => {
        try {
            RentModel.updateOne({_id: rentId}, {$set: {status: STATUS_RECEIVED}})
                .then((mongoRes) => resolve(mongoRes))
                .catch((mongoResErr) => reject(mongoResErr));
        } catch (e) {
            reject(e);
        }
    });
};

const sentBackRent = (rentId) => {
    return new Promise(async (resolve, reject) => {
        try {
            RentModel.updateOne({_id: rentId}, {$set: {status: STATUS_SENT_BACK}})
                .then((mongoRes) => resolve(mongoRes))
                .catch((mongoResErr) => reject(mongoResErr));
        } catch (e) {
            reject(e);
        }
    });
};

const receivedBackRent = (rentId) => {
    return new Promise(async (resolve, reject) => {
        try {
            RentModel.updateOne({_id: rentId}, {$set: {status: STATUS_RECEIVED_BACK}})
                .then((mongoRes) => resolve(mongoRes))
                .catch((mongoResErr) => reject(mongoResErr));
        } catch (e) {
            reject(e);
        }
    });
};

const closedRent = (rentId) => {
    return new Promise(async (resolve, reject) => {
        try {
            RentModel.updateOne({_id: rentId}, {$set: {status: STATUS_CLOSED}})
                .then((mongoRes) => resolve(mongoRes))
                .catch((mongoResErr) => reject(mongoResErr));
        } catch (e) {
            reject(e);
        }
    });
};

const getAllRents = () => {
    return new Promise((resolve, reject) => {
        RentModel.find({}, (error, rents) => {
            return (error) ? reject(error) : resolve(rents);
        });
    });
};

const getOneRent = (rentId) => {
    return new Promise((resolve, reject) => {
        RentModel.findById(rentId, (error, rent) => {
            return (error) ? reject(error) : resolve(rent);
        });
    });
};

module.exports = {initRent, getAllRents, getOneRent, sentRent, receivedRent, sentBackRent, receivedBackRent, closedRent};