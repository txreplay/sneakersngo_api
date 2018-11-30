const BrandModel = require('../../models/brand.model');

const createBrand = (body, user) => {
    const names = JSON.parse(body.names);

    return new Promise((resolve, reject) => {
        //TODO: Handle response with all created and all errors
        let response = {created : [], error: []};

        for (const i in names) {
            if (names.hasOwnProperty(i)) {
                const brandName = names[i];

                BrandModel.findOne({name: brandName}, (error, brand) => {
                    if (error) {
                        return reject(error);
                    } else if (brand) {
                        return reject('Brand already exists.');
                    } else {
                        body.name = brandName;
                        body.createdBy = user._id;

                        BrandModel.create(body)
                            .then((mongoRes) => resolve(mongoRes))
                            .catch((mongoResErr) => reject(mongoResErr));
                    }
                });
            }
        }
    });
};

//TODO: Replace `createdBy` by the name of Author + Id
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

//TODO: Replace `createdBy` by the name of Author + Id
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

const editBrand = () => {
    return new Promise((resolve, reject) => {

    });
};

const deleteBrand = () => {
    return new Promise((resolve, reject) => {

    });
};

module.exports = {createBrand, getAllBrands, getOneBrand, editBrand, deleteBrand};