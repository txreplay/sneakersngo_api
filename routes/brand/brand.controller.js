const BrandModel = require('../../models/brand.model');

const createBrand = (body, user) => {
    return new Promise(async (resolve, reject) => {
        try {
            const names = JSON.parse(body['names']);
            let create_response = {created: [], error: []};

            for (const i in names) {
                if (names.hasOwnProperty(i) && names[i].trim() !== '') {
                    body.name = names[i].trim();
                    body.createdBy = user._id;

                    await (async function() {
                        await BrandModel.create(body)
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

const getAllBrands = () => {
    return new Promise((resolve, reject) => {
        BrandModel.find({}, (error, brands) => {
            if (error) {
                return reject(error);
            } else {
                return resolve(brands);
            }
        });
    });
};

const getOneBrand = (brandId) => {
    return new Promise((resolve, reject) => {
        BrandModel.findById(brandId, (error, brand) => {
            if (error) {
                return reject(error);
            } else {
                return resolve(brand);
            }
        });
    });
};

const editOneBrand = () => {
    return new Promise((resolve, reject) => {

    });
};

const deleteOneBrand = (brandId) => {
    return new Promise((resolve, reject) => {
        BrandModel.deleteOne({_id: brandId}, (error, brand) => {
            if (error) {
                return reject(error);
            } else {
                return resolve(brand);
            }
        });
    });
};

module.exports = {createBrand, getAllBrands, getOneBrand, editOneBrand, deleteOneBrand};