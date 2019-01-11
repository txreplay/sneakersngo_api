const SneakerModel = require('../../models/sneaker.model');

const createSneaker = (body, user) => {
    return new Promise(async (resolve, reject) => {
        try {
            body.createdBy = user._id;

            SneakerModel.create(body)
                .then((mongoRes) => resolve(mongoRes))
                .catch((mongoResErr) => reject(mongoResErr));
        } catch (e) {
            reject(e);
        }
    });
};

const getAllSneakers = () => {
    return new Promise((resolve, reject) => {
        SneakerModel.find({}, (error, sneakers) => {
            return (error) ? reject(error) : resolve(sneakers);
        });
    });
};

const getAllSneakersByModel = (modelId) => {
    return new Promise((resolve, reject) => {
        SneakerModel.find({model: modelId}, (error, sneakers) => {
            return (error) ? reject(error) : resolve(sneakers);
        });
    });
};

const getOneSneaker = (sneakerId) => {
    return new Promise((resolve, reject) => {
        SneakerModel.findById(sneakerId, (error, sneaker) => {
            return (error) ? reject(error) : resolve(sneaker);
        });
    });
};

const editOneSneaker = () => {};

const deleteOneSneaker = (sneakerId) => {
    return new Promise((resolve, reject) => {
        SneakerModel.deleteOne({_id: sneakerId}, (error, sneaker) => {
            return (error) ? reject(error) : resolve(sneaker);
        });
    });
};

module.exports = {createSneaker, getAllSneakers, getAllSneakersByModel, getOneSneaker, editOneSneaker, deleteOneSneaker};