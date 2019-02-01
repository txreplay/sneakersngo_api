const UserModel = require('../../models/user.model');

const addToWishlist = (body, user) => {
    return new Promise(async (resolve, reject) => {
        try {
            UserModel.find({_id: user._id, wishlist: {$in: [body['sneakerId']]}}, (error, myUser) => {
                if (myUser.length === 0) {
                    UserModel.updateOne({_id: user._id}, {$push: {wishlist: body['sneakerId']}}, (error, user) => {
                        return (error) ? reject(error) : resolve(user);
                    });
                } else {
                    return reject('Already in wishlist');
                }
            });
        } catch (e) {
            reject(e);
        }
    });
};

const deleteFromWishlist = (sneakerId, user) => {
    return new Promise((resolve, reject) => {
        UserModel.find({_id: user._id, wishlist: {$in: [sneakerId]}}, (error, myUser) => {
            if (myUser.length === 1) {
                UserModel.updateOne({_id: user._id}, {$pullAll: {wishlist: [sneakerId]}}, (error, user) => {
                    return (error) ? reject(error) : resolve(user);
                });
            } else {
                return reject('Not in wishlist');
            }
        });
    });
};

module.exports = {addToWishlist, deleteFromWishlist};
