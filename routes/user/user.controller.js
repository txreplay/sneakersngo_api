const UserModel = require('../../models/user.model');

const updateProfile = (body, user) => {
    return new Promise((resolve, reject) => {
        body.address = JSON.parse(body.address);

        UserModel.updateOne({_id: user._id}, {$set: body}, (error, user) => {
            return (error) ? reject(error) : resolve(user);
        });
    });
};

module.exports = {updateProfile};