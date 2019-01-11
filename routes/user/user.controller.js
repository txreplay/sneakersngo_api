const UserModel = require('../../models/user.model');

const updateProfile = (body, user) => {
    return new Promise((resolve, reject) => {
        body.address = JSON.parse(body.address);

        UserModel.updateOne({_id: user._id}, {$set: body}, (error, user) => {
            return (error) ? reject(error) : resolve(user);
        });
    });
};

const getAllUsers = () => {
    return new Promise((resolve, reject) => {

        UserModel.find({}, (error, users) => {
            return (error) ? reject(error) : resolve(users);
        });
    });
};

const getOneUser = (userId) => {
    return new Promise((resolve, reject) => {
        UserModel.findById(userId, (error, users) => {
            return (error) ? reject(error) : resolve(users);
        });
    });
};

const getUsersStats = () => {
    return new Promise((resolve, reject) => {
        console.log('aaa');
        getAllUsers()
            .then(users => {
                console.log(users);
            })
            .catch((mongoResErr) => reject(mongoResErr));

    });
};

module.exports = {updateProfile, getAllUsers, getOneUser, getUsersStats};