const UserModel = require('../../models/user.model');

const addToCart = (body, user) => {
    return new Promise(async (resolve, reject) => {
        try {
            isInCart(body['sneakerId'], user)
                .then((isIn) => {
                    if (!isIn) {
                        UserModel.updateOne({_id: user._id}, {$push: {cart: body['sneakerId']}}, (error, user) => {
                            return (error) ? reject(error) : resolve(user);
                        });
                    } else {
                        return reject('Already in cart');
                    }
                })
                .catch((error) => reject(error));
        } catch (e) {
            reject(e);
        }
    });
};

const isInCart = (sneakerId, user) => {
    return new Promise((resolve, reject) => {
        UserModel.find({_id: user._id, cart: {$in: [sneakerId]}}, (error, myUser) => {
            if (error) {
                return reject(error);
            }

            return (myUser.length === 0) ? resolve(false) : resolve(true);
        });
    });
};

const deleteFromCart = (sneakerId, user) => {
    return new Promise((resolve, reject) => {
        isInCart(sneakerId, user)
            .then((isIn) => {
                if (isIn) {
                    UserModel.updateOne({_id: user._id}, {$pullAll: {cart: [sneakerId]}}, (error, user) => {
                        return (error) ? reject(error) : resolve(user);
                    });
                } else {
                    return reject('Not in cart');
                }
            })
            .catch((error) => reject(error));
    });
};

module.exports = {addToCart, deleteFromCart, isInCart};
