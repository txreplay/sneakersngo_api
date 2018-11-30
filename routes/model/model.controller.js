const ModelModel = require('../../models/model.model');

const createModel = (body, user) => {
    const names = JSON.parse(body.names);

    return new Promise((resolve, reject) => {
        //TODO: Handle response with all created and all errors
        let response = {created : [], error: []};

        for (const i in names) {
            if (names.hasOwnProperty(i)) {
                const modelName = names[i];

                ModelModel.findOne({name: modelName}, (error, model) => {
                    if (error) {
                        return reject(error);
                    } else if (model) {
                        return reject('Model already exists.');
                    } else {
                        body.name = modelName;
                        body.createdBy = user._id;

                        ModelModel.create(body)
                            .then((mongoRes) => resolve(mongoRes))
                            .catch((mongoResErr) => reject(mongoResErr));
                    }
                });
            }
        }
    });
};

//TODO: Replace `createdBy` by the name of Author + Id
const getAllModels = () => {
    return new Promise((resolve, reject) => {
        ModelModel.find({}, (error, models) => {
            if (error) {
                return reject(error);
            } else {
                return resolve(models);
            }
        });
    });
};

//TODO: Replace `createdBy` by the name of Author + Id
const getOneModel = (modelId) => {
    return new Promise((resolve, reject) => {
        ModelModel.findById(modelId, (error, model) => {
            if (error) {
                return reject(error);
            } else {
                return resolve(model);
            }
        });
    });
};

const editModel = () => {
    return new Promise((resolve, reject) => {

    });
};

const deleteModel = () => {
    return new Promise((resolve, reject) => {

    });
};

module.exports = {createModel, getAllModels, getOneModel, editModel, deleteModel};