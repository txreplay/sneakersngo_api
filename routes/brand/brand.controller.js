const BrandModel = require('../../models/brand.model');

const createBrand = (body, user) => {
    return new Promise((resolve, reject) => {
        try {
            const names = JSON.parse(body['names']);

            //TODO: Handle response with all created and all errors

            for (const i in names) {
                if (names.hasOwnProperty(i) && names[i].trim() !== '') {
                    body.name = names[i].trim();
                    body.createdBy = user._id;

                    BrandModel.create(body)
                        .then((mongoRes) => resolve(mongoRes))
                        .catch((mongoResErr) => reject(mongoResErr));
                }
            }
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