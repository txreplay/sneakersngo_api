const ModelModel = require('../../models/model.model');

const createModel = (body, user) => {
    return new Promise(async (resolve, reject) => {
        try {
            const names = JSON.parse(body['names']);
            let create_response = {created: [], error: []};

            for (const i in names) {
                if (names.hasOwnProperty(i) && names[i].trim() !== '') {
                    body.name = names[i].trim();
                    body.createdBy = user._id;

                    await (async function() {
                        await ModelModel.create(body)
                            .then((mongoRes) => create_response.created.push(mongoRes))
                            .catch((mongoResErr) => create_response.error.push(mongoResErr));
                    }());
                }
            }

            return resolve(create_response);
        } catch (e) {
            reject('Field names must be an array.');
        }
    });
};

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

const getAllModelsFromBrand = (brandId) => {
    return new Promise((resolve, reject) => {
        ModelModel.find({brand: brandId}, (error, models) => {
            if (error) {
                return reject(error);
            } else {
                return resolve(models);
            }
        });
    });
};

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

const editOneModel = (modelId) => {
    return new Promise((resolve, reject) => {

    });
};

const deleteOneModel = (modelId) => {
    return new Promise((resolve, reject) => {
        ModelModel.deleteOne({_id: modelId}, (error, model) => {
            if (error) {
                return reject(error);
            } else {
                return resolve(model);
            }
        });
    });
};

module.exports = {createModel, getAllModels, getAllModelsFromBrand, getOneModel, editOneModel, deleteOneModel};