const UserModel = require('../../models/user.model');

const addToWishlist = (body, user) => {
    return new Promise(async (resolve, reject) => {
        try {
            isInWishlist(body['sneakerId'], user)
                .then((isIn) => {
                    if (!isIn) {
                        UserModel.updateOne({_id: user._id}, {$push: {wishlist: body['sneakerId']}}, (error, user) => {
                            return (error) ? reject(error) : resolve(user);
                        });
                    } else {
                        return reject('Already in wishlist');
                    }
                })
                .catch((error) => reject(error));
        } catch (e) {
            reject(e);
        }
    });
};

const isInWishlist = (sneakerId, user) => {
    return new Promise((resolve, reject) => {
        UserModel.find({_id: user._id, wishlist: {$in: [sneakerId]}}, (error, myUser) => {
            if (error) {
                return reject(error);
            }

            return (myUser.length === 0) ? resolve(false) : resolve(true);
        });
    });
};

const deleteFromWishlist = (sneakerId, user) => {
    return new Promise((resolve, reject) => {
        isInWishlist(sneakerId, user)
            .then((isIn) => {
                if (isIn) {
                    UserModel.updateOne({_id: user._id}, {$pullAll: {wishlist: [sneakerId]}}, (error, user) => {
                        return (error) ? reject(error) : resolve(user);
                    });
                } else {
                    return reject('Not in wishlist');
                }
            })
            .catch((error) => reject(error));
    });
};

module.exports = {addToWishlist, deleteFromWishlist, isInWishlist};
